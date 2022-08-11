import {TimeDto} from "src/dtos/TimeDto";
import {WeekTimesDto} from "src/dtos/WeekTimesDto";

export class WeekTimes {
  constructor(times: Map<string, TimeDto[]>, edgeTimeBeforeThisWeek: TimeDto) {
    this.timesWithinThisWeek = times;
    this.edgeTimeBeforeThisWeek = edgeTimeBeforeThisWeek;
  }

  timesWithinThisWeek: Map<string, TimeDto[]>;
  edgeTimeBeforeThisWeek: TimeDto

  //todo: check!!!! tomorrow로 해야할 삘
  // getTimesOfheDayAfterTargetDay(todayDayOfWeek: string): TimeDto[] {
  //   if (todayDayOfWeek === 'SUNDAY') {
  //     return this.times.MONDAY;
  //   }
  //
  //   if (todayDayOfWeek === 'MONDAY') {
  //     return this.times.TUESDAY;
  //   }
  //
  //   if (todayDayOfWeek === 'TUESDAY') {
  //     return this.times.WEDNESDAY;
  //   }
  //
  //   if (todayDayOfWeek === 'WEDNESDAY') {
  //     return this.times.THURSDAY;
  //   }
  //
  //   if (todayDayOfWeek === 'THURSDAY') {
  //     return this.times.FRIDAY;
  //   }
  //
  //   if (todayDayOfWeek === 'FRIDAY') {
  //     return this.times.SATURDAY;
  //   }
  //
  //   if (todayDayOfWeek === 'SATURDAY') {
  //     return this.times.NEXT_SUNDAY;
  //   }
  //
  //   throw new Error("이상한 요일입니다.");
  // }

  getTimesOf(todayDayOfWeek: string): TimeDto[] {
    return this.timesWithinThisWeek[todayDayOfWeek];
  }
}
