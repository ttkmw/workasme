export class DateTime {
  constructor(dateTime: string) {
    // todo: validate
    this.dateTime = dateTime;
  }

  private readonly dateTime: string;

  public getDate(): string {
    return this.dateTime.split("T")[0];
  }

  public getTime(): string {
    return this.dateTime.split("T")[1];
  }

  public getDateTime(): string {
    return this.dateTime;
  }
}
