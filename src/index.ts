import TelegramBot from "node-telegram-bot-api";
import { Worker } from "worker_threads";
import dotenv from "dotenv";

import { AppDataSource } from "@/data-source";
import logger from "@/utils/logger";
import newMember from "@/handlers/newMember";
import { PLEADING_FACE } from "@/utils/emojis";
import { containsMathExpr, getMathExprs, computeMathExpr } from "@/utils/math";

const MAX_MSG_LENGTH = 4096;
const TIMEOUT = 200;

function withTimeout<T>(promise: Promise<T>, timeoutMessage: string, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(timeoutMessage));
    }, ms);

    promise.then(
      (result) => {
        clearTimeout(timeout);
        resolve(result);
      },
      (error) => {
        clearTimeout(timeout);
        reject(error);
      }
    );
  });
}

function containsNylon(text?: string): boolean {
  if (!text) return false;
  return text.includes("nylon")
      || text.includes("sodamntired")
      || text.includes("damnlinks");
}

function isNylonMessage(message: TelegramBot.Message): boolean {
  if (!message?.from) return false;
  if (message?.from?.username == "nyapsilon" && message.text?.includes("nylon")) return true;

  const { username, first_name, last_name } = message.from;
  return [username, first_name, last_name].map(containsNylon).some(Boolean);
}

function consultationMessage(): string {
  const consultationTime = () => {
    const hrs = Math.round(Math.random() * 5) + 5;
    const mins = [0, 15, 20, 30, 40, 45, 50][Math.floor(Math.random()*7)];

    const hFormat = (hrs < 10 ? "0" : "");
    const mFormat = (mins < 10 ? "0" : "");
    return String(hFormat + hrs + ":"  + mFormat + mins+ " PM");
  }

  const makeZoomPwd = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  const d = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `Topic: АК - Лаб. ${['1', '2', '3', '4'][Math.floor(Math.random()*4)]} - Консультация\nTime: ${month} ${date}, ${year} ${consultationTime()} ${(Math.random() < 0.4) ? 'Europe/Podgorica' : 'Moscow'}\n\nJoin Zoom Meeting\nhttps://itmo.zoom.us/j/${Array(11).fill(0).map(() => Math.round(Math.random() * 9)).join('')}?pwd=${makeZoomPwd(30)}.1`;
}

async function main() {
  logger.info("KamilBot started...");

  dotenv.config();
  process.env.NTBA_FIX_319 = "1";

  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN environment variable is not set!");
  }

  const bot = new TelegramBot(token, {
    polling: {
      params: {
        allowed_updates: [
          "update_id",
          "message",
          "edited_message",
          "channel_post",
          "edited_channel_post",
          "inline_query",
          "chosen_inline_result",
          "callback_query",
          "shipping_query",
          "pre_checkout_query",
          "poll",
          "poll_answer",
          "my_chat_member",
          "chat_member",
        ],
      },
    },
  });

  const PING_MESSAGE = "Камильчик";

  bot.on("message", (message) => {
    if (message.new_chat_members != undefined) {
      message.new_chat_members.forEach(() => {
        newMember(bot, message)
      })
    }
  });


  bot.on("message", (message) => {
    const context = {
      message_id: message.message_id,
      from_user: message.from?.username,
    };

    if (message?.text?.toLowerCase().includes("камиль, поздоровайся")) {
      newMember(bot, message);
    }

    if (isNylonMessage(message)) {
      logger.info(context, "Nylon said something!");
      bot.sendMessage(
        message.chat.id,
        `Раб Божий Нулон молвил:\n«${message?.text}»\n\nГой еси, добрый молодец!`,
        {
          reply_to_message_id: message.message_id,
        }
      );
    }

    // like `1 + 1`
    if (containsMathExpr(message?.text?.toLowerCase())) {
      logger.info(context, ">> MATH EXPR");

      const computeRequest = (): Promise<void> => {
        return new Promise((resolve, reject) => {
          const mes = getMathExprs(message?.text?.toLowerCase());

          if (mes !== null && mes?.length > 0) {
            const worker = new Worker('./workers/calculator.ts');
            worker.postMessage(mes);

            worker.on('message', (result) => {
              result.forEach((answer: string) => {
                for (let i = 0, charsLength = answer.length; i < charsLength; i += MAX_MSG_LENGTH) {
                  bot.sendMessage(
                    message.chat.id,
                    answer.substring(i, i + MAX_MSG_LENGTH),
                    { reply_to_message_id: message.message_id }
                  );
                }
              });

              resolve(result);
              worker.terminate();
            });

            worker.on('error', (error) => {
              reject(error);
              worker.terminate();
            });

            worker.on('exit', (code) => {
              if (code !== 0) {
                reject(new Error(`Worker stopped with exit code ${code}`));
              }
            });
          } else {
            reject(new Error("!!! No math expressions found"));
          }
        });
      };

      (async () => {
        try {
          await withTimeout(computeRequest(), `Не могу вычислить решение, высокая занятость ${PLEADING_FACE}`, TIMEOUT);
        } catch (error: unknown) {
          const err = error as Error;
          logger.warn(context, '!! MATH EXPR TIMEOUT');
          bot.sendMessage(
            message.chat.id,
            err.message,
            { reply_to_message_id: message.message_id }
          );
        }
      })();

      logger.info(context, ">> AFTER MATH EXPR");
    }

    if (message?.text?.toLowerCase()?.includes("консультация?")) {
      logger.info(context, "Консультация?");
      const rand = Math.random();
      let msg;
      if (rand < 0.7) {
        msg = 'Консультация!'
      } else if (rand < 0.8) {
        msg = 'Г';
      } else {
        msg = 'Ж';
      }

      bot.sendMessage(message.chat.id, msg, { reply_to_message_id: message.message_id });
    }

    if (message?.text?.includes("¿")) {
      logger.info(context, "EspQuestion¿");
      bot.sendMessage(
        message.chat.id,
        `¡Esta es una consulta en español, amigos míos!`,
        { reply_to_message_id: message.message_id }
      );
    }

    if (!message?.text?.toLowerCase()?.includes("консультация?") && (message?.text?.includes("?") || message?.text?.includes("？")) && !message?.text?.includes("¿")) {
      logger.info(context, "Question");
      const rand = Math.random();
      if (rand < 0.9) {
        bot.sendMessage(
          message.chat.id,
          `Консультация.`,
          { reply_to_message_id: message.message_id }
        );
      } else {
        bot.sendMessage(
          message.chat.id,
          `- Изя, ты ж юрист, хотел у тебя спросить. У меня тут сложилась такая неприятная ситуация...\n- Подожди, Мойше, тебе нужен совет или консультация?\n- А в чем разница?\n- Совет бесплатно, а консультация за за деньги.\n- Конечно, мне нужен твой совет!\n- Мой тебе совет: запишись на консультацию.`,
          { reply_to_message_id: message.message_id }
        );
      }
    }

    if (
      message?.text?.toLowerCase()?.match(/консультаци(?:е[йю]|ям|ями|ях|[ийюя])/)
        && !message?.from?.username?.includes('kamil')
        && !message?.text?.toLowerCase()?.includes("консультация?")
    ) {
      logger.info(context, "!KAMIL CONSULT");
      bot.sendMessage(
        message.chat.id,
        consultationMessage(),
        {
          reply_to_message_id: message.message_id,
        }
      );
    }

    if (
      message?.text?.includes(PING_MESSAGE) ||
      message?.text?.includes(PING_MESSAGE.toLowerCase())
    ) {
      logger.info(context, "PING");
      bot.sendMessage(
        message.chat.id,
        `Я не мёртвый, я живой ${PLEADING_FACE}`,
        {
          reply_to_message_id: message.message_id,
        }
      );
    }

    if (message?.text === PLEADING_FACE.repeat(3) && message?.from?.username === 'kamilonly') {
      logger.info(context, "PLEADING_FACE");
      bot.sendMessage(
        message.chat.id,
        PLEADING_FACE.repeat(3),
        {
          reply_to_message_id: message.message_id,
        }
      );
    }

    if (process.env.BOT_DEBUG === "true") {
      logger.debug(context, "Debug answering.");
      bot.sendMessage(message.chat.id, PLEADING_FACE, {
        reply_to_message_id: message.message_id,
      });
    }

    if (Math.floor(Math.random() * 100) === 50 || message?.text?.includes("Кому нужна консультация?")) {
      logger.info(context, "Random consulting event.");
      bot.sendMessage(message.chat.id, `Проконсультируй меня ${PLEADING_FACE}`, {
        reply_to_message_id: message.message_id,
      });
    }

    if (Math.floor(Math.random() * 1000) + 1 === 69) {
      logger.info(context, "Random feeding event.");
      bot.sendMessage(message.chat.id, `Покорми меня ${PLEADING_FACE}`, {
        reply_to_message_id: message.message_id,
      });
    }
  });

  bot.on("polling_error", (msg) => logger.error(msg));
}

AppDataSource.initialize().then(async () => {
  logger.info("Database loaded.");
  main().catch((err) => {
    logger.error(err);
    process.exit(1);
  });
}).catch(error => logger.error(error));
