import {TimeDto} from "src/dtos/TimeDto";

export interface WeekTimesDto {
  readonly week: {
    "LAST_SATURDAY": TimeDto[],
    "SUNDAY": TimeDto[],
    "MONDAY": TimeDto[],
    "TUESDAY": TimeDto[],
    "WEDNESDAY": TimeDto[],
    "THURSDAY": TimeDto[],
    "FRIDAY": TimeDto[],
    "SATURDAY": TimeDto[],
  }
}
