import { Container } from "inversify";
import AxiosProvider from "src/context/inversify/providers/AxiosProvider";

export const container = new Container();
container.bind(AxiosProvider).toSelf().inSingletonScope();
