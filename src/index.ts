import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

import GreetingGenerator from "./GreetingGenerator";
import FemaleNamesDictionary from "./dictionaries/FemaleNamesDictionary";
import logger from "./utils/logger";
import {PLEADING_FACE} from "./utils/emojis";

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
  const generator = new GreetingGenerator(new FemaleNamesDictionary());

  bot.on("new_chat_members", (message) => {
    logger.info(
      {
        message_id: message.message_id,
        from_user: message.from?.username,
        new_username: generator.getNewName(message),
      },
      `New user: ${message.from?.username}`
    );
    logger.info(
      {message_id: message.message_id, from_user: message.from?.username},
      `Answer: "${generator.generate(message)}"`
    );

    generator.generate(message).forEach((msg, index) => {
      const options =
        index == 0 ? {reply_to_message_id: message.message_id} : {};
      bot.sendMessage(message.chat.id, msg, options);
    });
  });

  bot.on("message", (message) => {
    const context = {
      message_id: message.message_id,
      from_user: message.from?.username,
    };

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
