import {DateTime} from "src/model/DateTime";

export interface TimeDto {
  readonly startDateTime: DateTime;
  readonly endDateTime: DateTime
  //todo: to enum
  readonly type: string
}
