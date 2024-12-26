//Данные

import {ApiPostMethods} from "../components/base/api";

export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IOrder {
    count: number;
    buyingCards: ICard[];
    items: string[];
    email: string;
    phone: string;
    address: string;
    payment: string;
    id: string;
    total: number;

    addCard(card: ICard): void;
    removeCard(card: ICard): void;
    addPriceToTotal(price: number): void;
    minusPriceToTotal(price: number): void;
}

export interface ICardData {
    items: ICard[];
    preview: string | null;
    getCard(cardId: string): ICard;
}

export interface IApi {
    get<T>(uri: string): Promise<T>;
    post<T>(uri: string, data: object, method?: ApiPostMethods) : Promise<T>;
}

export type TCardInfo = Pick<ICard,'image' | "title" | "category" | "price">
export type TCardInOrder = Pick<ICard, "title" | "price">
export type TOrderInfo = Pick<IOrder, "count" | "items" | "total">
export type TOrderDelivery = Pick<IOrder, "payment" | "address">
export type TOrderProfile = Pick<IOrder, "phone" | "email">
export type TOrderComplete = Pick<IOrder, "total">
export type TOrderCount = Pick<IOrder, "count">
export type TBinInfo = TOrderInfo | TCardInOrder
export type TMainPage = TOrderCount | TCardInfo

