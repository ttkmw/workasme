import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const createAxios = (config: AxiosRequestConfig): AxiosInstance => {
  return axios.create(config);
};

export const host = `${process.env.REACT_APP_WORKASME_SERVER_HOST}:${process.env.REACT_APP_WORKASME_SERVER_PORT}`;

export default createAxios;
