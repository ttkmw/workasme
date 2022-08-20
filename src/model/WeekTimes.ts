import {TimeBlockDto} from "src/dtos/TimeBlockDto";
import {WeekTimesDto} from "src/dtos/WeekTimesDto";
import {TodoDto} from "src/dtos/TodoDto";
import {number} from "prop-types";

export class WeekTimes {
  constructor(times: Map<string, TimeBlockDto[]>, edgeTimeBeforeThisWeek: TimeBlockDto | undefined, todoWithinThisWeek: Map<string, TodoDto[]>) {
    console.log("constructor!!!!!!!!!!!!!!!!!!!!", todoWithinThisWeek.keys())
    this.timesWithinThisWeek = times;
    this.edgeTimeBeforeThisWeek = edgeTimeBeforeThisWeek;

    for (const key of Array.from(todoWithinThisWeek.keys())) {
      let todoDtosAtDate: TodoDto[] | undefined = todoWithinThisWeek.get(key);
      if (todoDtosAtDate === undefined) {
        todoDtosAtDate = [
          {id: undefined, isChecked: false, content: ''},
          {id: undefined, isChecked: false, content: ''},
          {id: undefined, isChecked: false, content: ''},
        ]
      }
      while (todoDtosAtDate.length < 3) {
        todoDtosAtDate.push({id: undefined, isChecked: false, content: ''})
      }
    }
    this.todoWithinThisWeek = todoWithinThisWeek;

  }

  timesWithinThisWeek: Map<string, TimeBlockDto[]>;
  edgeTimeBeforeThisWeek: TimeBlockDto | undefined
  todoWithinThisWeek: Map<string, TodoDto[]>;
}
