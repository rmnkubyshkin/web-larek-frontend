import {IBasketUI} from "../../types/components/view/IBasketUI";
import {IProduct} from "../../types/components/model/IAppState";

export class BasketUI implements IBasketUI {
    productList: IProduct[];

    close(): void {
    }

    order(): void {
    }
}