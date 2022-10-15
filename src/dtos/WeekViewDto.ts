import {TimeBlockDto} from "src/dtos/TimeBlockDto";
import {TodoDto} from "src/dtos/TodoDto";
import {DailyRecordDto} from "src/dtos/DailyRecordDto";



export interface WeekViewDto {
  dailyRecords: Map<string, DailyRecordDto>
  edgeTime: TimeBlockDto | undefined

}


