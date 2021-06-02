// 범위 1~100
import {Size} from "src/graphic/size/Size";

export default class Percentage implements Size {
  private readonly _value: number;

  // todo: validation logic and test
  constructor(value: number) {
    this._value = value;
  }

  get value(): number {
    return this._value;
  }

  public toString = (): string => {
    return `${this._value.toString()}%`;
  };
}
