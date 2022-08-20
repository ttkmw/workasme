import {TimeBlockDto} from "src/dtos/TimeBlockDto";
import {WeekTimesDto} from "src/dtos/WeekTimesDto";
import {TodoDto} from "src/dtos/TodoDto";
import {number} from "prop-types";
import {addBlankTodoAtThisWeek, someDayIsFullOfContents} from "src/service/TodoListService";



export class WeekTimes {
  constructor(times: Map<string, TimeBlockDto[]>, edgeTimeBeforeThisWeek: TimeBlockDto | undefined, todoWithinThisWeek: Map<string, TodoDto[]>) {
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
      const maxCount = getMaxCountOfTodosAtDate(todoWithinThisWeek);
      while (todoDtosAtDate.length < maxCount) {
        todoDtosAtDate.push({id: undefined, isChecked: false, content: ''})
      }
    }

    if (someDayIsFullOfContents(todoWithinThisWeek)) {
      addBlankTodoAtThisWeek(todoWithinThisWeek)
    }

    this.todoWithinThisWeek = todoWithinThisWeek;
  }

  timesWithinThisWeek: Map<string, TimeBlockDto[]>;
  edgeTimeBeforeThisWeek: TimeBlockDto | undefined
  todoWithinThisWeek: Map<string, TodoDto[]>;
}

function getMaxCountOfTodosAtDate(todoWithinThisWeek: Map<string, TodoDto[]>) {
  let maxCount = 0;
  for (const key of Array.from(todoWithinThisWeek.keys())) {
    let todoDtosAtDate: TodoDto[] = todoWithinThisWeek.get(key)!;
    if (maxCount < todoDtosAtDate.length) {
      maxCount = todoDtosAtDate.length;
    }
  }
  return maxCount;
}


