export class TimeRecordOnWeekView {
  constructor(id: number, startTime: string) {
    this.id = id;

    //todo: validate startTime
    this.startTime = startTime;
  }

  id: number;
  startTime: string;

  getAlias() {
    const hour = this.startTime.split(":")[0];
    if (hour[0] === '0') {
      return hour[1];
    }
    return hour;
  }
}
