import {ICard, ICardData} from "../../types";
import {IEvents} from "../base/events";

export class CardData implements ICardData {
    protected _items: ICard[];
    protected _preview: string | null;
    protected events: IEvents;

    constructor(events: IEvents) {
        this._items = [];
        this.events = events;
    }
    get items() {
        return this._items;
    }

    getCard(cardId: string) {
        return this._items.find((item) => item.id === cardId)
    }

    set items(items:ICard[]) {
        this._items = this._items.concat(items);
    }

    get preview() {
        return this._preview;
    }

    set preview(preview: string | null) {
        this._preview = preview;
    }
}