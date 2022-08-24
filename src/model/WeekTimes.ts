import {TimeBlockDto} from "src/dtos/TimeBlockDto";
import {TodoDto} from "src/dtos/TodoDto";



export class WeekTimes {
  constructor(times: Map<string, TimeBlockDto[]>, edgeTimeBeforeThisWeek: TimeBlockDto | undefined, todoWithinThisWeek: Map<string, TodoDto[]>) {
    this.timesWithinThisWeek = times;
    this.edgeTimeBeforeThisWeek = edgeTimeBeforeThisWeek;
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


