import { injectable } from "inversify";
import IProvider from "src/context/inversify/providers/IProvider";
import axios, {AxiosInstance} from "axios";
import axiosFactory from "src/api/adapterFactory/axiosFactory";
import {useDispatch} from "react-redux";
import {signIn as signInActionCreator} from "src/context/redux/signSlice";
import createAxios from "src/api/adapterFactory/axiosFactory";
import {workasme_host} from "src/api/host/workasme";

// @injectable()
// export class NameProvider implements IProvider<string> {
//   provide() {
//     return "World";
//   }
// }


@injectable()
class AxiosProvider implements IProvider<AxiosInstance> {
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

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (accessToken) => dispatch(signInActionCreator({accessToken: accessToken})),
});

export default AxiosProvider;
