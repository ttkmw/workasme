import {injectable} from "inversify";
import AxiosSupplier from "src/api/AxiosSupplier";
import {container} from "src/context/inversify/container";
import {TYPES} from "src/context/inversify/types";
import {AxiosInstance} from "axios";
import {store} from "src/context/redux/store";
import {signIn as signInAction} from "src/context/redux/signSlice";

@injectable()
class UserApi {

  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = container.get<AxiosSupplier>(TYPES.AxiosSupplier).provide();
  }

  public async signUp(username: string, email: string, firstName: string, lastName: string, password: string) {
    let response;
    try {
      response = await this.axiosInstance.post(`/iam/realms/bintegration/users`, {
        "username": username,
        "email": email,
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
      });
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

  public async signIn(email: string, password: string) {
    let response;
    try {
      response = await this.axiosInstance.post(`/iam/realms/bintegration/protocol/openid-connect/token`, {
        "username": email,
        "password": password,
      });
      store.dispatch(signInAction({accessToken: response.data.access_token}))
      // this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`;
      localStorage.setItem("refresh_token", response.data.refresh_token)
      return response.data.access_token;

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
