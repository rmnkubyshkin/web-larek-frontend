import {IMainUI} from "./IMainUI";

export interface ICardUI extends IMainUI{
    title: string;
    image: string;
    description: string;
    price: string;
    category: string;
    buyProduct(id: string) : void;
    close(): void;
}
