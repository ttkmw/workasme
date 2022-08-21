import {TodoDto} from "src/dtos/TodoDto";

export function someDayIsFullOfContents(todoWithinThisWeek: Map<string, TodoDto[]>) {
  for (const key of Array.from(todoWithinThisWeek.keys())) {
    let todoDtosAtDate: TodoDto[] | undefined = todoWithinThisWeek.get(key);
    if (!todoDtosAtDate!.some(todoDto => todoDto.content === '' || todoDto.content === undefined)) {
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
