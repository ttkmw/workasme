//todo: 나중에는 ExpectedTime을 ExpectedWork로 바꾸자

export interface TimeSnippet {
  expectedActivity: string;
  expectedTime: number;
  actualActivity: string;
  actualTime: number;
  timeCategory: string;
}

export enum TimeCategory {
  ETC = "ETC"
}
