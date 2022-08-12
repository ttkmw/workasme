import {DateTime} from "src/model/DateTime";

export interface TimeBlockDto {
  readonly title: string;
  readonly startDateTime: DateTime;
  readonly endDateTime: DateTime;
  readonly isGood: boolean;
  //todo: to enum
  readonly category: string;
  readonly memo: string | undefined;
}
