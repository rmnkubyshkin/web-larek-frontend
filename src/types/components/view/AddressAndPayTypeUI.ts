import {PayType} from "../model/AppState";

export interface AddressAndPayTypeUI {
    payType: PayType;
    addressDelivery: string;
    next(): void;
    close(): void;
}