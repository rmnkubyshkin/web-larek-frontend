import {Product} from "../model/AppState";

export interface BinUI {
 productList: Product[];
 close(): void;
 order(): void;
}
