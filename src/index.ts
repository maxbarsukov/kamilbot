import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

import GreetingGenerator from "./GreetingGenerator";
import FemaleNamesDictionary from "./dictionaries/FemaleNamesDictionary";
import logger from "./utils/logger";
import {PLEADING_FACE} from "./utils/emojis";

function newMember(bot: TelegramBot, message: TelegramBot.Message) {
  const generator = new GreetingGenerator(new FemaleNamesDictionary());
  const answer = generator.generate(message);

  const context = {
    message_id: message.message_id,
    from_user: message.from?.username,
  };

  logger.info(
    {...context, new_username: generator.getNewName(message)},
    `New user: ${message.from?.username}, ${message.from?.first_name}, ${message.from?.last_name}`
  );
  logger.info(context, `Answer: "${answer}"`);

  bot
    .sendMessage(message.chat.id, answer[0], {
      reply_to_message_id: message.message_id,
    })
    .then(() => {
      if (answer[1]) return bot.sendMessage(message.chat.id, answer[1]);
    })
    .then(() => {
      if (answer[2]) return bot.sendMessage(message.chat.id, answer[2]);
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

  bot.on("new_chat_members", (message) => {
    newMember(bot, message);
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

    if (process.env.BOT_DEBUG === "true") {
      logger.debug(context, "Debug answering.");
      bot.sendMessage(message.chat.id, PLEADING_FACE, {
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

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
