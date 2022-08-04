import {TimeDto} from "src/dtos/TimeDto";

export interface WeekTimesDto {
  week: {
    "MONDAY": TimeDto[],
    "TUESDAY": TimeDto[],
    "WEDNESDAY": TimeDto[],
    "THURSDAY": TimeDto[],
    "FRIDAY": TimeDto[],
    "SATURDAY": TimeDto[],
    "SUNDAY": TimeDto[],
  }
  lastDayOfLastSunday: TimeDto[]
}
