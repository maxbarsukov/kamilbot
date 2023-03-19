import Dictionary from "./Dictionary";
import names from "./FemaleNames";

export default class FemaleNamesDictionary extends Dictionary {
  public get(key: string) {
    return names[key];
  }
}
