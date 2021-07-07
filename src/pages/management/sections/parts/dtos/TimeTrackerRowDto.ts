//todo: 나중에는 ExpectedTime을 ExpectedWork로 바꾸자

export interface TimeTrackerRowDto {
  readonly expectedActivity: string;
  readonly expectedTime: string;
  readonly acutualActivity: string;
  readonly actuaTime: string;
  readonly timeCategory: string
}
