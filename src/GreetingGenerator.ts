import TelegramBot from "node-telegram-bot-api";
import _ from "lodash";

import Dictionary from "./dictionaries/Dictionary";
import {DELICIOUS, PLEADING_FACE, SHY_FINGERS} from "./utils/emojis";

export default class GreetingGenerator {
  private dictionary: Dictionary;
  private name: string | undefined;
  private alreadySmalltalk = false;

  constructor(dictionary: Dictionary) {
    this.dictionary = dictionary;
  }

  public getNewName(message: TelegramBot.Message) {
    if (message.from?.username) {
      return this.dictionary.get(message.from.username);
    }
    return "No name from dictionary";
  }

  public generate(message: TelegramBot.Message) {
    if (message.from?.username) {
      const name = this.dictionary.get(message.from.username);
      if (!name) {
        this.name = name;
      }
    }

    return _.compact([this.hello(), this.smalltalk(), this.last()]);
  }

  private hello() {
    const welcomes = [
      "Привет",
      "Привет!",
      "привет",
      "По моей проверочке",
      "Привет, как дела?",
      "снова привет)",
      "приветик",
    ];

    if (!this.name) {
      const welcome = _.sample(welcomes);
      if (welcome?.includes("дел")) this.alreadySmalltalk = true;
      return welcome;
    }

    welcomes.push(
      `Привет, ${this.name}`,
      `привет, ${this.name}, как дела?`,
      `привет, ${this.name}, что делаешь?`,
      `Приветик ${this.name}`,
      `привет, ${this.name}`,
      `привет ${this.name}`,
      `${this.name} привет`,
      `${this.name} привет`,
      `${this.name} приветик`,
      `${this.name}, привет!`,
      `${this.name}, привет, как дела?`,
      `${this.name}, привет, что делаешь?`,
      `${this.name} привет, что делаешь?`
    );

    const welcome = _.sample(welcomes);
    if (welcome?.includes("дел")) this.alreadySmalltalk = true;

    const rand = Math.random();
    if (rand < 1.0 / 8) {
      return welcome + " " + PLEADING_FACE;
    } else if (rand < 1.0 / 4) {
      return welcome + " " + SHY_FINGERS;
    } else if (rand < 1.0 / 3) {
      return welcome + " " + PLEADING_FACE + SHY_FINGERS;
    } else if (rand < 1.0 / 2) {
      return welcome + " " + PLEADING_FACE + PLEADING_FACE + PLEADING_FACE;
    } else {
      return welcome;
    }
  }

  private smalltalk() {
    if (this.alreadySmalltalk) {
      if (Math.random() < 1.0 / 3) {
        return "Чем занимаешься?";
      }
      return "";
    }

    if (!this.name) {
      return "";
    }

    const smalltalks = [
      "Что делаешь?",
      "Как дела?",
      "как дела?",
      "Чем занимаешься?",
      "чем занимаешься?",
      `${this.name} что делаешь?`,
      `${this.name} как дела?`,
      `${this.name} чем занимаешься?`,
      `${this.name}, что делаешь?`,
      `${this.name}, как дела?`,
      `${this.name}, чем занимаешься?`,
      `Что делаешь ${this.name}?`,
      `Как дела, ${this.name}?`,
      `Чем занимаешься ${this.name}?`,
    ];

    return _.sample(smalltalks);
  }

  private last() {
    if (!this.name) {
      return "";
    }

    const rand = Math.random();
    if (rand < 1.0 / 8) {
      return PLEADING_FACE;
    } else if (rand < 1.0 / 4) {
      return PLEADING_FACE + SHY_FINGERS;
    } else if (rand < 1.0 / 3) {
      return PLEADING_FACE + PLEADING_FACE + SHY_FINGERS + SHY_FINGERS;
    } else if (rand < 1.0 / 2.5) {
      return PLEADING_FACE + PLEADING_FACE + PLEADING_FACE;
    } else if (rand < 1.0 / 2) {
      return DELICIOUS;
    } else if (rand < 1.0 / 1.5) {
      return DELICIOUS + DELICIOUS + DELICIOUS;
    } else {
      return "";
    }
  }
}
