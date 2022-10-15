import { Container } from "inversify";
import AxiosSupplier from "src/api/AxiosSupplier";
import {TYPES} from "src/context/inversify/types";
import UserApi from "src/api/UserApi";
import WeekViewApi from "src/api/WeekViewApi";

// todo: 현재 왜인지 @inject가 안돼서 bind - get 하고 있음. loader를 추가하던지 해서 @inject로 주입하면 좋을듯
export const container = new Container();
container.bind<AxiosSupplier>(TYPES.AxiosSupplier).to(AxiosSupplier).inSingletonScope();
// container.bind<AxiosSupplier>(TYPES.AxiosSupplier).to(AxiosSupplier);
container.bind(UserApi).toSelf().inSingletonScope();
container.bind(WeekViewApi).toSelf().inSingletonScope();
