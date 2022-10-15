import {injectable} from "inversify";
import {AxiosInstance, AxiosResponse} from "axios";
import {container} from "src/context/inversify/container";
import AxiosSupplier from "src/api/AxiosSupplier";
import {TYPES} from "src/context/inversify/types";
import {WeekViewDto} from "src/dtos/WeekViewDto";

@injectable()
class WeekViewApi {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = container.get<AxiosSupplier>(TYPES.AxiosSupplier).provide();
  }

  public async getWeekView(date: string, time: string): Promise<WeekViewDto> {
    const axiosResponse: AxiosResponse = await this.axiosInstance.get<WeekViewDto>('/life-history/workasme/week-view');
    return axiosResponse.data;

  }
}

export default WeekViewApi;
