import {Component} from "../base/Component";
import {CardView} from "./CardView";

export interface ICardsContainer {
    catalog: HTMLElement[];
    items: Partial<CardView>;
}

export class CardsContainer extends Component<ICardsContainer> {
    protected _catalog: HTMLElement;
    protected _items: Partial<CardView>

    constructor(protected container: HTMLElement, ) {
        super(container);
    }

    set items(items: Partial<CardView>) {
    }

    set catalog(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}