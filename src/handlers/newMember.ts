import TelegramBot from "node-telegram-bot-api";

import logger from "@/utils/logger";
import GreetingGenerator from "@/GreetingGenerator";
import FemaleNamesDictionary from "@/dictionaries/FemaleNamesDictionary";

export default function newMember(bot: TelegramBot, message: TelegramBot.Message) {
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
