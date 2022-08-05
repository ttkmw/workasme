import {DateTime} from "src/model/DateTime";
import {Dayjs} from "dayjs";
import {TimeRecordTemplate} from "src/model/TimeRecordTemplate";

function parseHour(startTime: string) {
  const hour = Number();
  return 0;
}

export class TimeRecordOnWeekView {
  private readonly _id: number;
  private readonly _startDateTime: DateTime;
  private readonly _endDateTime: DateTime;

  get id(): number {
    return this._id;
  }

  get startDateTime(): DateTime {
    return this._startDateTime;
  }

  get endDateTime(): DateTime {
    return this._endDateTime;
  }
  constructor(id: number, day:Dayjs, timeRecordTemplate: TimeRecordTemplate) {
    this._id = id;

    //todo: validate startTime
    this._startDateTime = TimeRecordOnWeekView.convertToStartDateTime(day, timeRecordTemplate.startTime);

    this._endDateTime = TimeRecordOnWeekView.convertToEndDateTime(day, timeRecordTemplate.getEndTime());
  }

  private static convertToEndDateTime(day: Dayjs, endTime: string): DateTime {
    const hour: number = Number(endTime.split(":")[0]);
    if (0 <= hour && hour <= 3) {
      const tomorrow = day.add(1, 'day')
      return new DateTime(tomorrow.year() + "-" + this.convertMonth(tomorrow) + "-" + this.convertDate(tomorrow) + "T" + endTime);
    }
    return new DateTime(day.year() + "-" + this.convertMonth(day) + "-" + this.convertDate(day) + "T" + endTime);
  }

  private static convertMonth(day: Dayjs) {
    if (day.month() + 1 < 10) {
      return "0" + String(day.month() + 1);
    }
    return String(day.month() + 1);
  }

  private static convertToStartDateTime(day: Dayjs, startTime: string): DateTime {
    const hour: number = Number(startTime.split(":")[0]);
    if (0 <= hour && hour <= 2) {
      const tomorrow = day.add(1, 'day')
      return new DateTime(tomorrow.year() + "-" + this.convertMonth(tomorrow) + "-" + this.convertDate(tomorrow) + "T" + startTime)
    }

    return new DateTime(day.year() + "-" + this.convertMonth(day)+ "-" + this.convertDate(day) + "T" + startTime)
  }

  private static convertDate(day: Dayjs) {
    if (day.date() < 10) {
      return "0" + String(day.date());
    }
    return String(day.date());
  }

  getAlias() {
    const hour = this._startDateTime.getHour();
    if (hour[0] === '0') {
      return hour[1];
    }
    return hour;
  }
}
