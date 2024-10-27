import {IAddressAndPayTypeUI} from "../../types/components/view/IAddressAndPayTypeUI";
import {PayType} from "../../types/components/model/IAppState";

export class AddressAndPayTypeUI implements IAddressAndPayTypeUI {
    addressDelivery: string;
    payType: PayType;

    close(): void {
    }

    next(): void {
    }
}