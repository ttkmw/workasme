import {TimeDto} from "src/dtos/TimeDto";

export interface WeekTimesDto {
  readonly week: {
    "SUNDAY": TimeDto[],
    "MONDAY": TimeDto[],
    "TUESDAY": TimeDto[],
    "WEDNESDAY": TimeDto[],
    "THURSDAY": TimeDto[],
    "FRIDAY": TimeDto[],
    "SATURDAY": TimeDto[],
    "NEXT_SUNDAY": TimeDto[],
  }
}
