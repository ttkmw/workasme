import Percentage from "./percentage";
import {Size} from "src/graphic/size/Size";


export default class Pixel implements Size {
  private readonly _value: number;

  constructor(value: number) {
    this._value = value;
  }

  get value(): number {
    return this._value;
  }

  public toString = (): string => {
    return `${this._value.toString()}px`;
  };

  public multiply(percentage: Percentage): Pixel {
    return new Pixel(this._value * (percentage.value / 100));
  }

  public minus(other: Pixel): Pixel {
    return new Pixel(this._value - other._value);
  }

  public plus(other: Pixel): Pixel {
    return new Pixel(this._value + other._value);
  }

  public isNotZero() {
    return this._value !== 0;
  }

  equals(number: number) {
    return this.value === number;
  }

  divideBy(standard: Pixel): Percentage {
    return new Percentage((this.value / standard.value) * 100);
  }
}
