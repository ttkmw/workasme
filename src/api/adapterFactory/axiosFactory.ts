import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const createAxios = (config: AxiosRequestConfig): AxiosInstance => {
  return axios.create(config);
};

export const host = '13.124.89.189:8081';

export default createAxios;
