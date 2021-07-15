
export interface TaskListRowDto {
  readonly name: string;
  readonly importanceLevel: string;
  readonly stuckOn: string;
  readonly checkPriority: string;
  onClick: () => void;
}


enum TaskImportanceLevel {

}
