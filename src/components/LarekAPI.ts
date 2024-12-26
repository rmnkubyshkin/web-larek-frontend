// import { Api, ApiListResponse } from './base/api';
// import {IProduct, IOrder, IOrderResult} from "../types/components/model/IAppState";
//
// export interface ILarekAPI {
//     getProductList: () => Promise<IProduct[]>;
//     getProductItem: (id: string) => Promise<IProduct>;
//     orderProduct: (order: IOrder) => Promise<IOrderResult>;
// }
//
// export class LarekAPI extends Api implements ILarekAPI {
//     readonly cdn: string;
//
//     constructor(cdn: string, baseUrl: string, options?: RequestInit) {
//         super(baseUrl, options);
//         this.cdn = cdn;
//     }
//
//     getProductItem(id: string): Promise<IProduct> {
//         return this.get(`/product/${id}`).then(
//             (item: IProduct) => ({
//                 ...item,
//                 image: this.cdn + item.image,
//             })
//         );
//     }
//
//     getProductList(): Promise<IProduct[]> {
//         return this.get('/product').then((data: ApiListResponse<IProduct>) =>
//             data.items.map((item) => ({
//                 ...item,
//                 image: this.cdn + item.image
//             }))
//         );
//     }
//
//     orderProduct(order: IOrder): Promise<IOrderResult> {
//         return this.post('/order', order).then(
//             (data: IOrderResult) => data
//         );
//     }
//
// }

import {IApi, ICard, ICardData, IOrder} from "../types";

export class LarekAPI {
    private _baseApi: IApi;

    constructor(baseApi: IApi) {
        this._baseApi = baseApi;
    }

    getCards(): Promise<ICard[]> {
        const cards: ICard[] = [];
        return this._baseApi.get<Partial<ICardData>>('/product')
            .then((result: Partial<ICardData>) => {
                result.items.forEach((item) => {
                    cards.push(item);
                });
                return cards;
            });
    }

    getCard(id: string): Promise<ICard> {
        return this._baseApi.get<ICard>(`/product/${id}`)
            .then((card: ICard) => card);
    }

    placeAnOrder(order: Partial<IOrder>): Promise<IOrder> {
        const o = {
            "payment": order.payment,
            "email": order.email,
            "phone": order.phone,
            "address": order.address,
            "total": order.total,
            "items": order.items
        };
        return this._baseApi.post<IOrder>('/order', o, 'POST')
            .then((order: IOrder) => order);
    }
}