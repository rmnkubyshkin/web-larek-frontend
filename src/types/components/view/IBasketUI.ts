import {IProduct} from "../model/IAppState";
import {IMainUI} from "./IMainUI";

export interface IBasketUI  extends IMainUI{
 productList: IProduct[];
 close(): void;
 order(): void;
}
