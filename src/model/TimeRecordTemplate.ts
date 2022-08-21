import {RelativeDay} from "src/model/RelativeDay";

export class TimeRecordTemplate {
  get relativeDay(): RelativeDay {
    return this._relativeDay;
  }
  get startTime() {
    return this._startTime;
  }
  constructor(startTime: string, relativeDay: RelativeDay) {
    this._startTime = startTime;
    this._relativeDay = relativeDay;
  }

  private readonly _startTime: string;
  private readonly _relativeDay: RelativeDay;

  public getEndTime(): string {

    const startHour = Number(this._startTime.split(":")[0]);
    const endHour = startHour + 1;
    if (endHour < 10) {
      return "0" + String(endHour) + ":00";
    }
    return String(endHour) + ":00";
  }
}
