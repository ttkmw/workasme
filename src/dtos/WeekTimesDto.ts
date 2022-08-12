import {TimeBlockDto} from "src/dtos/TimeBlockDto";

export interface WeekTimesDto {
  readonly week: {
    "SUNDAY": TimeBlockDto[],
    "MONDAY": TimeBlockDto[],
    "TUESDAY": TimeBlockDto[],
    "WEDNESDAY": TimeBlockDto[],
    "THURSDAY": TimeBlockDto[],
    "FRIDAY": TimeBlockDto[],
    "SATURDAY": TimeBlockDto[],
    "NEXT_SUNDAY": TimeBlockDto[],
  }
}
