import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const createAxios = (config: AxiosRequestConfig): AxiosInstance => {
  return axios.create(config);
};

export default createAxios;
