import {DateTime} from "src/model/DateTime";
import dayjs, {Dayjs} from "dayjs";
import {TimeRecordTemplate} from "src/model/TimeRecordTemplate";
import moment from "moment";
import {WeekTimes} from "src/model/WeekTimes";
import {TimeBlockDto} from "src/dtos/TimeBlockDto";
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

  private formatToDateTime(moment: moment.Moment): string {
    return moment.format("YYYY-MM-DDTHH:mm");
  }

  private static getFormattedDate(day: Dayjs, relativeDay: RelativeDay): string {
    const currentDay = day.add(relativeDay.valueOf(), 'day');
    const year = currentDay.year();
    const month = currentDay.month() + 1;
    const date = currentDay.date();

    return `${year}-${month < 10 ? "0" + month : month}-${date < 10 ? "0" + date : date}`;
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
      const lastTimeBeforeTodayFirstTime = this.getEdgeTimeOfDay(savedTimes);
      if (lastTimeBeforeTodayFirstTime !== undefined) {
        return true;
        // if (moment(lastTimeBeforeTodayFirstTime.endDateTime.getDateTime()).isAfter(this.getFirstDateTime())) {
        //
        // }
      }
    }

    const atSameDate: TimeBlockDto[] | undefined = savedTimes.timesWithinThisWeek.get(this.getStartDate());
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

  private getEdgeTimeOfDay(savedTimes: WeekTimes): TimeBlockDto {
    let currentDate = this.getCurrentDate();
    const firstDateOfThisWeek: Dayjs = TimeRecord.getFirstDateOfThisWeek(savedTimes);
    while (TimeRecord.getFormattedDate(currentDate, RelativeDay.TODAY) !== TimeRecord.getFormattedDate(firstDateOfThisWeek, RelativeDay.TODAY)) {
      const formattedCurrentDate: string = TimeRecord.getFormattedDate(currentDate, RelativeDay.TODAY);
      const timesOfDate: TimeBlockDto[] | undefined = savedTimes.timesWithinThisWeek.get(formattedCurrentDate);
      currentDate = currentDate.subtract(1, 'days');

      if (timesOfDate === undefined || timesOfDate.length === 0) {
        currentDate = currentDate.subtract(1, 'days');
        continue;
      }

      for (let timeOfDate of timesOfDate) {
        if (moment(timeOfDate.startDateTime.getDateTime()).isBefore(this.getFirstDateTime())
          && moment(timeOfDate.endDateTime.getDateTime()).isAfter(this.getFirstDateTime())
        ) {
          return timeOfDate;
        }
      }
    }

    return savedTimes.edgeTimeBeforeThisWeek;
  }

  private getCurrentDate() {
    return dayjs(this.getStartDate());
  }

  private static getFirstDateOfThisWeek(savedTimes: WeekTimes): Dayjs {
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

  private getFirstDateTime(): moment.Moment {
    return moment(this.getStartDate() + "T" + TimeRecord.FIRST_TIME);
  }

  private isFirstTime() {
    return this.getStartTime() === TimeRecord.FIRST_TIME;
  }

  public calculateHeightTimes(savedTimes: WeekTimes, isMatching: boolean): Percentage | undefined {
    if (!isMatching) {
      return undefined;
    }

    if (this.isFirstTime()) {
      const edgeTimeOfDay = this.getEdgeTimeOfDay(savedTimes);
      if (edgeTimeOfDay !== undefined) {
        const endDateTimeOfEdgeTime: moment.Moment =  moment(edgeTimeOfDay.endDateTime.getDateTime());
        if (endDateTimeOfEdgeTime.isAfter(this.getFirstDateTime())) {
            return new Percentage(endDateTimeOfEdgeTime.diff(this.getFirstDateTime(), 'hours') * 100);
        }
      }
    }

    const todayTimes: TimeBlockDto[] | undefined = savedTimes.timesWithinThisWeek.get(TimeRecord.getFormattedDate(this.getCurrentDate(), RelativeDay.TODAY));
    if (todayTimes === undefined) {
      return undefined;
    }

    for (let todayTime of todayTimes) {
      if (this.getStartDateTime() === todayTime.startDateTime.getDateTime()) {
          const endDateTimeOfTimeBlock: moment.Moment = this.getEndDateTimeOfTimeBlock(todayTime);
          console.log("getStartDateTime", todayTime.startDateTime.getDateTime(), endDateTimeOfTimeBlock);
          return new Percentage(endDateTimeOfTimeBlock.diff(this._startDateTime, 'hours') * 100);
      }
    }

    return undefined;
  }

  private getEndDateTimeOfTimeBlock(timeBlock: TimeBlockDto): moment.Moment {
    const maxEndDateTime: moment.Moment = this.getMaxEndDateTime();
    const timeBlockEndDateTime = moment(timeBlock.endDateTime.getDateTime());
    return timeBlockEndDateTime.isBefore(maxEndDateTime) ? timeBlockEndDateTime : maxEndDateTime;
  }

  private getMaxEndDateTime() {
    return this._startDateTime.isBefore(this.getFirstDateTime()) ? this.getFirstDateTime() : this.getFirstDateTime().add(1, "days");
  }
}
