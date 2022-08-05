import {start} from "repl";

export class TimeRecordTemplate {
  get startTime() {
    return this._startTime;
  }
  constructor(startTime) {
    this._startTime = startTime;
  }

  private readonly _startTime;

  public getEndTime(): string {

    const startHour = Number(this._startTime.split(":")[0]);
    const endHour = startHour + 1;
    if (endHour < 10) {
      return "0" + String(endHour) + ":00";
    }
    return String(endHour) + ":00";
  }
}
