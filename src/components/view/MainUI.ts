import {IMainUI} from "../../types/components/view/IMainUI";
import {IProduct} from "../../types/components/model/IAppState";

export class MainUI implements IMainUI {
    productList?: IProduct[];
}