import { injectable } from "inversify";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";


export const workasme_host = `${process.env.REACT_APP_WORKASME_SERVER_HOST}:${process.env.REACT_APP_WORKASME_SERVER_PORT}`;

@injectable()
class AxiosSupplier {
  private readonly axiosInstance: AxiosInstance;
  constructor() {
    // this.axiosInstance = axios;
    // const dispatch = useDispatch();


    this.axiosInstance = createAxios({
      baseURL: workasme_host
    });
  }

  provide(): AxiosInstance {
    return this.axiosInstance;
  }
}

const createAxios = (config: AxiosRequestConfig): AxiosInstance => {
  const axiosInstance: AxiosInstance = axios.create(config);
  axiosInstance.interceptors.response.use(response => {
    return response
  }, async error => {
    // console.clear();
    const { config, response: { status } } = error;
    const originalRequest = config;
    console.log("data", error.response.data)
    if (status === 401 && error.response.data.code === 'expired_access_token') {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await axios.post(`${workasme_host}/iam/realms/bintegration/protocol/openid-connect/refresh-token`, {
        "refreshToken": refreshToken
      });

      const accessToken = response.data.access_token;

      return new Promise((resolve, reject) => {
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        resolve(axios(originalRequest));
      });
    } else {
      return Promise.reject(error);
    }
  })
  return axiosInstance;
};

export default AxiosSupplier;
