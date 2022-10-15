import {TimeBlockDto} from "src/dtos/TimeBlockDto";
import {TodoDto} from "src/dtos/TodoDto";

export interface DailyRecordDto {
  times: TimeBlockDto[],
  todos: TodoDto[]
}
