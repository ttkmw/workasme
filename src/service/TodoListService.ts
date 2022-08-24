import {TodoDto} from "src/dtos/TodoDto";
import {Dayjs} from "dayjs";
import {TimeRecord} from "src/model/TimeRecord";
import {RelativeDay} from "src/model/RelativeDay";

export function someDayIsFullOfContents(todoWithinThisWeek: Map<string, TodoDto[]>, weekdays: Dayjs[]) {
  for (const key of weekdays) {
    let todoDtosAtDate: TodoDto[] | undefined = todoWithinThisWeek.get(TimeRecord.getFormattedDate(key, RelativeDay.TODAY));
    if (todoDtosAtDate === undefined) {
      continue;
    }

    if (!todoDtosAtDate.some(todoDto => todoDto.content === '' || todoDto.content === undefined)) {
      return true;
    }
  }
  return false;
}

export function addBlankTodoAtThisWeek(todoWithinThisWeek: Map<string, TodoDto[]>) {
  for (const key of Array.from(todoWithinThisWeek.keys())) {
    let todoDtosAtDate: TodoDto[] | undefined = todoWithinThisWeek.get(key);
    todoDtosAtDate!.push({id: undefined, isChecked: false, content: ''})
  }
}
