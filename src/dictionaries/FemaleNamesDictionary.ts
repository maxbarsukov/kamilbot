import Dictionary from "./Dictionary";
import names from "../utils/FemaleNames";

export default class FemaleNamesDictionary extends Dictionary {
  public get(key: string) {
    const username = key.toLowerCase().replace(/[^a-zA-Zа-яА-ЯёЁ]+/g, "");

    const foundKey = Object.keys(names).reduce((current, last) => {
      if (username.includes(current)) {
        return current;
      }
      return last;
    });

    return names[foundKey];
  }
}
