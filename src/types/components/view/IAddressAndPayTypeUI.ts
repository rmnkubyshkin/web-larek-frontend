import {PayType} from "../model/IAppState";
import {IMainUI} from "./IMainUI";

export interface IAddressAndPayTypeUI extends IMainUI{
    payType: PayType;
    addressDelivery: string;
    next(): void;
    close(): void;
}