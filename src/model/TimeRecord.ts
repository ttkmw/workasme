import dayjs, {Dayjs} from "dayjs";
import {TimeRecordTemplate} from "src/model/TimeRecordTemplate";
import moment from "moment";
import {TimeBlockDto} from "src/dtos/TimeBlockDto";
import {RelativeDay} from "src/model/RelativeDay";
import Percentage from "src/graphic/size/percentage";
import {WeekViewDto} from "src/dtos/WeekViewDto";

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

  public static getFormattedDate(day: Dayjs, relativeDay: RelativeDay): string {
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

  public getMatching(savedTimes: WeekViewDto, standardDate: Dayjs): TimeBlockDto | undefined {
    if (this.isFirstTime()) {
      const edgeTimeOfDay = this.getEdgeTimeOfDay(savedTimes, standardDate);
      if (edgeTimeOfDay !== undefined) {
        return edgeTimeOfDay;
      }
    }

    const dailyRecord = savedTimes.dailyRecords.get(this.getStartDate());
    if (dailyRecord === undefined) {
      return undefined;
    }
    // const atSameDate: TimeBlockDto[] | undefined = savedTimes.timesWithinThisWeek.get(this.getStartDate());
    // if (atSameDate === undefined) {
    //   return undefined;
    // }

    const atSameDate = dailyRecord.times;
    for (let i = 0; i < atSameDate.length; i++) {
      const candidate = atSameDate[i];
      if (this.getStartDateTime() === candidate.startDateTime.dateTime) {
        return candidate;
      }
    }

    return undefined;
  }

  public match(savedTimes: WeekViewDto, standardDate: Dayjs) {
    if (this.isFirstTime()) {
      const edgeTimeOfDay = this.getEdgeTimeOfDay(savedTimes, standardDate);
      if (edgeTimeOfDay !== undefined) {
        return true;
        // if (moment(lastTimeBeforeTodayFirstTime.endDateTime.getDateTime()).isAfter(this.getFirstDateTime())) {
        //
        // }
      }
    }

    const dailyRecord = savedTimes.dailyRecords.get(this.getStartDate());
    if (dailyRecord === undefined) {
      return false;
    }
    const atSameDate = dailyRecord.times;


    for (let i = 0; i < atSameDate.length; i++) {
      const candidate = atSameDate[i];
      if (this.getStartDateTime() === candidate.startDateTime.dateTime) {
        return true;
      }
    }

    return false;
  }

  private getEdgeTimeOfDay(savedTimes: WeekViewDto, standardDate: Dayjs): TimeBlockDto | undefined {
    let currentDate = this.getCurrentDate();
    const firstDateOfThisWeek: Dayjs = TimeRecord.getFirstDateOfThisWeek(standardDate);
    while (TimeRecord.getFormattedDate(currentDate, RelativeDay.YESTERDAY) !== TimeRecord.getFormattedDate(firstDateOfThisWeek, RelativeDay.TODAY) && firstDateOfThisWeek.isBefore(currentDate.add(1, "days"))) {
      const formattedCurrentDate: string = TimeRecord.getFormattedDate(currentDate, RelativeDay.TODAY);

      let dailyRecord = savedTimes.dailyRecords.get(formattedCurrentDate);
      if (dailyRecord === undefined || dailyRecord.times.length === 0) {
        currentDate = currentDate.subtract(1, 'days');
        continue;
      }
      //  const timeBlocksOfDate: TimeBlockDto[] | undefined = savedTimes.timesWithinThisWeek.get(formattedCurrentDate);
      //
      // if (timeBlocksOfDate === undefined || timeBlocksOfDate.length === 0) {
      //   currentDate = currentDate.subtract(1, 'days');
      //   continue;
      // }

      for (let timeOfDate of dailyRecord.times) {
        if (moment(timeOfDate.startDateTime.dateTime).isBefore(this.getFirstDateTime())
          && moment(timeOfDate.endDateTime.dateTime).isAfter(this.getFirstDateTime())
        ) {
          return timeOfDate;
        }
      }
      currentDate = currentDate.subtract(1, 'days');
    }

    if (savedTimes.edgeTime !== undefined) {
      return (moment(savedTimes.edgeTime.startDateTime.dateTime).isBefore(this.getFirstDateTime())
        && moment(savedTimes.edgeTime.endDateTime.dateTime).isAfter(this.getFirstDateTime())
      ) ? savedTimes.edgeTime : undefined;
    }

    return savedTimes.edgeTime;
  }

  private getCurrentDate() {
    return dayjs(this.getStartDate());
  }

  private static getFirstDateOfThisWeek(standardDate: Dayjs): Dayjs {
    let firstDateOfThisWeek: Dayjs | undefined = undefined;

    for (let date of TimeRecord.calculateWeekdaysForView(standardDate)) {
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

  public calculateHeightTimes(savedTimes: WeekViewDto, isMatching: boolean, standardDate: Dayjs): Percentage | undefined {
    if (!isMatching) {
      return undefined;
    }

    if (this.isFirstTime()) {
      const edgeTimeOfDay = this.getEdgeTimeOfDay(savedTimes, standardDate);
      if (edgeTimeOfDay !== undefined) {
        const endDateTimeOfEdgeTime: moment.Moment = moment(edgeTimeOfDay.endDateTime.dateTime);
        if (endDateTimeOfEdgeTime.isAfter(this.getFirstDateTime())) {
          return new Percentage(endDateTimeOfEdgeTime.diff(this.getFirstDateTime(), 'hours') * 100);
        }
      }
    }

    let dailyRecord = savedTimes.dailyRecords.get(TimeRecord.getFormattedDate(this.getCurrentDate(), RelativeDay.TODAY));
    if (dailyRecord === undefined) {
      return undefined;
    }

    for (let todayTime of dailyRecord.times) {
      if (this.getStartDateTime() === todayTime.startDateTime.dateTime) {
        const endDateTimeOfTimeBlock: moment.Moment = this.getEndDateTimeOfTimeBlock(todayTime);
        return new Percentage(endDateTimeOfTimeBlock.diff(this._startDateTime, 'hours') * 100);
      }
    }

    throw Error("이상한 상황");
  }

  private getEndDateTimeOfTimeBlock(timeBlock: TimeBlockDto): moment.Moment {
    const maxEndDateTime: moment.Moment = this.getMaxEndDateTime();
    const timeBlockEndDateTime = moment(timeBlock.endDateTime.dateTime);
    return timeBlockEndDateTime.isBefore(maxEndDateTime) ? timeBlockEndDateTime : maxEndDateTime;
  }



  private getMaxEndDateTime() {
    return this._startDateTime.isBefore(this.getFirstDateTime()) ? this.getFirstDateTime() : this.getFirstDateTime().add(1, "days");
  }

  public static calculateWeekdaysForView(day: Dayjs): Dayjs[] {

    const startDate = TimeRecord.getStartDate(day);
    const result: Dayjs[] = [];
    for (let i = 0; i < 7; i++) {
      result.push(startDate.add(i, 'day'))
    }

    return result;

  }

  private static getStartDate(day: dayjs.Dayjs) {
    if (day.day() === 0) {
      return day;
    }

    if (day.day() === 1) {
      return day.subtract(1, 'day')
    }

    if (day.day() === 2) {
      return day.subtract(2, 'day')
    }

    if (day.day() === 3) {
      return day.subtract(3, 'day')
    }

    if (day.day() === 4) {
      return day.subtract(4, 'day')
    }

    if (day.day() === 5) {
      return day.subtract(5, 'day')
    }

    return day.subtract(6, 'day')
  }
}
