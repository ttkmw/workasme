import {TimeDto} from "src/dtos/TimeDto";
import {WeekTimesDto} from "src/dtos/WeekTimesDto";

export class WeekTimes {
  constructor(weekTimesDto: WeekTimesDto) {
    this.week = {
      "SUNDAY": weekTimesDto.week.SUNDAY,
      "MONDAY": weekTimesDto.week.MONDAY,
      "TUESDAY": weekTimesDto.week.TUESDAY,
      "WEDNESDAY": weekTimesDto.week.WEDNESDAY,
      "THURSDAY": weekTimesDto.week.THURSDAY,
      "FRIDAY": weekTimesDto.week.FRIDAY,
      "SATURDAY": weekTimesDto.week.SATURDAY,
      "NEXT_SUNDAY": weekTimesDto.week.NEXT_SUNDAY,

    };
  }

  week: {
    "SUNDAY": TimeDto[],
    "MONDAY": TimeDto[],
    "TUESDAY": TimeDto[],
    "WEDNESDAY": TimeDto[],
    "THURSDAY": TimeDto[],
    "FRIDAY": TimeDto[],
    "SATURDAY": TimeDto[]
    "NEXT_SUNDAY": TimeDto[],
  };

  //todo: check!!!! tomorrow로 해야할 삘
  getTimesOfheDayAfterTargetDay(todayDayOfWeek: string): TimeDto[] {
    if (todayDayOfWeek === 'SUNDAY') {
      return this.week.MONDAY;
    }

    if (todayDayOfWeek === 'MONDAY') {
      return this.week.TUESDAY;
    }

    if (todayDayOfWeek === 'TUESDAY') {
      return this.week.WEDNESDAY;
    }

    if (todayDayOfWeek === 'WEDNESDAY') {
      return this.week.THURSDAY;
    }

    if (todayDayOfWeek === 'THURSDAY') {
      return this.week.FRIDAY;
    }

    if (todayDayOfWeek === 'FRIDAY') {
      return this.week.SATURDAY;
    }

    if (todayDayOfWeek === 'SATURDAY') {
      return this.week.NEXT_SUNDAY;
    }

    throw new Error("이상한 요일입니다.");
  }

  getTimesOf(todayDayOfWeek: string): TimeDto[] {
    return this.week[todayDayOfWeek];
  }
}
