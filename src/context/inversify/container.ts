import { Container } from "inversify";
import AxiosSupplier from "src/api/AxiosSupplier";
import {TYPES} from "src/context/inversify/types";
import UserApi from "src/api/UserApi";

export const container = new Container();
container.bind<AxiosSupplier>(TYPES.AxiosSupplier).to(AxiosSupplier).inSingletonScope();
// container.bind<AxiosSupplier>(TYPES.AxiosSupplier).to(AxiosSupplier);
container.bind(UserApi).toSelf().inSingletonScope();
