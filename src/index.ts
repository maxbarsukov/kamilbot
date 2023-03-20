import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

import GreetingGenerator from "./GreetingGenerator";
import FemaleNamesDictionary from "./dictionaries/FemaleNamesDictionary";
import {PLEADING_FACE} from "./utils/emojis";

async function main() {
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

  const generator = new GreetingGenerator(new FemaleNamesDictionary());

  bot.on("new_chat_members", (message, _meta) => {
    generator.generate(message).forEach((msg, index) => {
      const options =
        index == 0 ? {reply_to_message_id: message.message_id} : {};
      bot.sendMessage(message.chat.id, msg, options);
    });
  });

  bot.on("message", (message) => {
    if (process.env.BOT_DEBUG === "true") {
      bot.sendMessage(message.chat.id, PLEADING_FACE, {
        reply_to_message_id: message.message_id,
      });
    }

    if (Math.floor(Math.random() * 1000) + 1 === 69) {
      bot.sendMessage(message.chat.id, `Покорми меня ${PLEADING_FACE}`, {
        reply_to_message_id: message.message_id,
      });
    }
  });

  bot.on("polling_error", (msg) => console.log(msg));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
