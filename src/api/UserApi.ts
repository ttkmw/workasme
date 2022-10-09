import {injectable} from "inversify";
import AxiosSupplier from "src/api/AxiosSupplier";
import {container} from "src/context/inversify/container";
import {TYPES} from "src/context/inversify/types";
import {AxiosInstance} from "axios";

@injectable()
class UserApi {

  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = container.get<AxiosSupplier>(TYPES.AxiosSupplier).provide();
  }

  public async signIn(email: string, password: string) {
    let response;
    try {
      response = await this.axiosInstance.post(`/iam/realms/bintegration/protocol/openid-connect/token`, {
        "username": email,
        "password": password,
      });
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      localStorage.setItem("refresh_token", response.data.refresh_token)
      // dispatch(signInSlice({accessToken: accessToken}))


      response = await this.axiosInstance.get(`/life-history/times/kk`);
      console.log('response', response.data)
      return;

    } catch (e: any) {
      // console.clear();
      if (e.response) {
        console.warn("error", e.response.data.message);
        const status = e.response.status;
        if (status === 401) {
          const code: string = e.response.data.code;
          if (code.includes("credentials")) {
            alert("invalid email or password")
          } else {
            alert("unauthorized")
          }
          return
        }
      } else if (e.request) {
        alert("could not communicate with server")
      } else {
        alert("unknown error occurred")
      }
    }
  }
}

export default UserApi;
