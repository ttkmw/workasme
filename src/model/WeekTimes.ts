import {TimeDto} from "src/dtos/TimeDto";
import {WeekTimesDto} from "src/dtos/WeekTimesDto";

export class WeekTimes {
  constructor(weekTimesDto: WeekTimesDto) {
    this.week = {
      "LAST_SATURDAY": weekTimesDto.week.LAST_SATURDAY,
      "SUNDAY": weekTimesDto.week.SUNDAY,
      "MONDAY": weekTimesDto.week.MONDAY,
      "TUESDAY": weekTimesDto.week.TUESDAY,
      "WEDNESDAY": weekTimesDto.week.WEDNESDAY,
      "THURSDAY": weekTimesDto.week.THURSDAY,
      "FRIDAY": weekTimesDto.week.FRIDAY,
      "SATURDAY": weekTimesDto.week.SATURDAY,

    };
  }

  week: {
    "LAST_SATURDAY": TimeDto[],
    "SUNDAY": TimeDto[],
    "MONDAY": TimeDto[],
    "TUESDAY": TimeDto[],
    "WEDNESDAY": TimeDto[],
    "THURSDAY": TimeDto[],
    "FRIDAY": TimeDto[],
    "SATURDAY": TimeDto[]
  };

  //todo: check
  getYesterdayTimesOf(todayDayOfWeek: string): TimeDto[] {
    if (todayDayOfWeek === 'SUNDAY') {
      return this.week.LAST_SATURDAY;
    }

    if (todayDayOfWeek === 'MONDAY') {
      return this.week.SUNDAY;
    }

    if (todayDayOfWeek === 'TUESDAY') {
      return this.week.MONDAY;
    }

    if (todayDayOfWeek === 'WEDNESDAY') {
      return this.week.TUESDAY;
    }

    if (todayDayOfWeek === 'THURSDAY') {
      return this.week.WEDNESDAY;
    }

    if (todayDayOfWeek === 'FRIDAY') {
      return this.week.THURSDAY;
    }

    if (todayDayOfWeek === 'SATURDAY') {
      return this.week.FRIDAY;
    }

    if (todayDayOfWeek === 'SUNDAY') {
      return this.week.SATURDAY;
    }

    throw new Error("이상한 요일입니다.");
  }

  getTimesOf(todayDayOfWeek: string): TimeDto[] {
    return this.week[todayDayOfWeek];
  }
}
