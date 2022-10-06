import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {Dispatch} from "redux";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {workasme_host} from "src/api/host/workasme";

const createAxios = (config: AxiosRequestConfig, dispatch: Dispatch<any>, slice: ActionCreatorWithPayload<any>): AxiosInstance => {
  const axiosInstance: AxiosInstance = axios.create(config);
  axiosInstance.interceptors.response.use(response => {
    return response
  }, async error => {
    console.clear();
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401 && error.response.data.code === 'expired_access_token') {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await axiosInstance.post(`${workasme_host}/iam/realms/bintegration/protocol/openid-connect/refresh-token`, {
        "refreshToken": refreshToken
      });

      const accessToken = response.data.access_token;
      dispatch(slice({accessToken: accessToken}))

      return new Promise((resolve, reject) => {
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        resolve(axios(originalRequest));
      });
    } else {
      return Promise.reject(error);
    }
  })
  return axiosInstance;
};


export default createAxios;
