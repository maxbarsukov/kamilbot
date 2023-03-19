import TelegramBot from "node-telegram-bot-api";
import Dictionary from "./dictionaries/Dictionary";

export default class GreetingGenerator {
  private dictionary: Dictionary;

  constructor(dictionary: Dictionary) {
    this.dictionary = dictionary;
  }

  public generate(message: TelegramBot.Message) {
    return [this.hello(message), ...this.smalltalk(message)];
  }

  private hello(_message: TelegramBot.Message): string {
    return "Привет!";
  }

  private smalltalk(_message: TelegramBot.Message): string[] {
    return ["🥺🥺🥺", "Что делаешь?"];
  }
}
