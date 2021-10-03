import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const createAxios = (config: AxiosRequestConfig): AxiosInstance => {
  return axios.create(config);
};

export const host = '3.35.220.214:8081';

export default createAxios;
