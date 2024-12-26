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