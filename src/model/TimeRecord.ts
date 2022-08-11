import {DateTime} from "src/model/DateTime";
import dayjs, {Dayjs} from "dayjs";
import {TimeRecordTemplate} from "src/model/TimeRecordTemplate";
import moment from "moment";
import {WeekTimes} from "src/model/WeekTimes";
import {TimeDto} from "src/dtos/TimeDto";
import {RelativeDay} from "src/model/RelativeDay";
import Percentage from "src/graphic/size/percentage";

function parseHour(startTime: string) {
  const hour = Number();
  return 0;
}

export class TimeRecord {

  private static readonly FIRST_TIME = '03:00';

  private readonly _id: number;
  private readonly _startDateTime: moment.Moment;
  private readonly _endDateTime: moment.Moment;

  get id(): number {
    return this._id;
  }

  constructor(id: number, day: Dayjs, timeRecordTemplate: TimeRecordTemplate) {
    this._id = id;

    //todo: validate startTime

    const formattedDay = TimeRecord.getFormattedDate(day, timeRecordTemplate.relativeDay);
    // const startDateTime = moment(formattedDay + "T" + timeRecordTemplate.startTime);
    // const endDateTime = moment(startDateTime).add(1, "hours");
    // console.log("startDateTime", startDateTime.format("YYYY-MM-DDTHH:mm"));
    // console.log("endDateTime", endDateTime.format("HH:mm"));
    this._startDateTime = moment(formattedDay + "T" + timeRecordTemplate.startTime);
    this._endDateTime = moment(this._startDateTime).add(1, "hours");
  }

  public getStartDateTime(): string {
    return this._startDateTime.format("YYYY-MM-DDTHH:mm");
  }

  public getStartTime(): string {
    return this._startDateTime.format("HH:mm");
  }

  public getEndDateTime(): string {
    return this._endDateTime.format("YYYY-MM-DDTHH:mm");
  }

  private static getFormattedDate(day: Dayjs, relativeDay: RelativeDay): string {
    const currentDay = day.add(relativeDay.valueOf(), 'day');
    const year = currentDay.year();
    const month = currentDay.month() + 1;
    const date = currentDay.date();

    return `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
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

    return new DateTime(day.year() + "-" + this.convertMonth(day) + "-" + this.convertDate(day) + "T" + startTime)
  }

  private static convertDate(day: Dayjs) {
    if (day.date() < 10) {
      return "0" + String(day.date());
    }
    return String(day.date());
  }

  getAlias() {
    const hour = this._startDateTime.format("HH");
    if (hour[0] === '0') {
      return hour[1];
    }
    return hour;
  }

  public getEndDate(): string {
    return this._endDateTime.format("YYYY-MM-DD");
  }

  public getStartDate(): string {
    return this._startDateTime.format("YYYY-MM-DD");
  }

  public match(savedTimes: WeekTimes) {
    if (this.isFirstTime()) {
      const lastTimeBeforeTodayFirstTime = this.getLastTimeBeforeTodayFirstTime(savedTimes);
      if (lastTimeBeforeTodayFirstTime !== undefined) {
        if (moment(lastTimeBeforeTodayFirstTime.endDateTime.getDateTime()).isAfter(this.getFirstDateTime())) {
          return true;
        }
      }
    }

    const atSameDate: TimeDto[] | undefined = savedTimes.timesWithinThisWeek.get(this.getStartDate());
    if (atSameDate === undefined) {
      return false;
    }

    for (let i = 0; i < atSameDate.length; i++) {
      const candidate = atSameDate[i];
      if (this.getStartDateTime() === candidate.startDateTime.getDateTime()) {
        return true;
      }
    }

    return false;
  }

  private getLastTimeBeforeTodayFirstTime(savedTimes: WeekTimes): TimeDto {
    let currentDate = dayjs(this.getStartDate());
    const firstDateOfThisWeek: Dayjs = this.getFirstDateOfThisWeek(savedTimes);
    while (TimeRecord.getFormattedDate(currentDate, RelativeDay.TODAY) !== TimeRecord.getFormattedDate(firstDateOfThisWeek, RelativeDay.TODAY)) {
      const formattedCurrentDate: string = TimeRecord.getFormattedDate(currentDate, RelativeDay.TODAY);
      const timesOfDate: TimeDto[] | undefined = savedTimes.timesWithinThisWeek.get(formattedCurrentDate);
      currentDate = currentDate.subtract(1, 'days');
      if (timesOfDate !== undefined && timesOfDate.length !== 0) {
        return timesOfDate[timesOfDate.length - 1]
      } else {
        currentDate = currentDate.subtract(1, 'days');
      }
    }

    return savedTimes.edgeTimeBeforeThisWeek;
  }

  private getFirstDateOfThisWeek(savedTimes: WeekTimes): Dayjs {
    let firstDateOfThisWeek: Dayjs | undefined = undefined;
    for (let date of Array.from(savedTimes.timesWithinThisWeek.keys())) {
      const weekDate = dayjs(date);
      if (firstDateOfThisWeek === undefined) {
        firstDateOfThisWeek = weekDate;
      }

      if (weekDate.isBefore(firstDateOfThisWeek)) {
        firstDateOfThisWeek = weekDate;
      }
    }
    return firstDateOfThisWeek!;
  }

  private getCandidateToBeFirstTime(atSameDate: TimeDto[]): TimeDto {
    const firstDateTime: moment.Moment = this.getFirstDateTime();
    const exTime = moment(firstDateTime).subtract(1, "hours");
    console.log("firstDateTime", firstDateTime.hours(), exTime.hours());
    // for (let i = 0; i < 3; )

    return atSameDate[atSameDate.length - 1];
  }

  private getFirstDateTime(): moment.Moment {
    return moment(this.getStartDate() + "T" + TimeRecord.FIRST_TIME);
  }

  private isFirstTime() {
    return this.getStartTime() === TimeRecord.FIRST_TIME;
  }

  public calculateHeightTimes(savedTimes: WeekTimes): Percentage {
    const edgeTimeBeforeThisWeek = savedTimes.edgeTimeBeforeThisWeek;
    if (this.isFirstTime() && edgeTimeBeforeThisWeek !== undefined) {

      const edgeTimeEndDateTime: moment.Moment = this.convertEdgeTimeEndDateTime(edgeTimeBeforeThisWeek.endDateTime)
      // const atSameDate: TimeDto[] | undefined = savedTimes.timesWithinThisWeek.get(this.getStartDate());
      // if (atSameDate !== undefined && atSameDate.length !== 0) {
      //   const candidate: TimeDto = atSameDate[atSameDate.length - 1];
      // }
    }

    return new Percentage(100);
  }

  private convertEdgeTimeEndDateTime(endDateTime: DateTime) {
    const edgeTimeEndDateTime = moment(endDateTime.getDateTime());
    const maxOfEdgeTime = moment(this.getFirstDateTime()).add(1, 'days').subtract(1, 'hours')
    return edgeTimeEndDateTime.isBefore(maxOfEdgeTime) ? edgeTimeEndDateTime : maxOfEdgeTime;
  }
}
