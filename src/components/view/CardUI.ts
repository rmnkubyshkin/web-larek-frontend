import {ICardUI} from "../../types/components/view/ICardUI";

export class CardUI implements ICardUI {
    title: string;
    image: string;
    description: string;
    price: string;
    category: string;

    buyProduct(id: string) : void {
    }

    close(): void {
    }
}
