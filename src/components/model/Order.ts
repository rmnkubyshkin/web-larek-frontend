import {ICard, IOrder} from "../../types";
import {IEvents} from "../base/events";

export class Order extends Object implements IOrder {
    protected _count: number;
    protected _items: string[];
    protected _buyingCards: ICard[];
    protected _email: string;
    protected _phone: string;
    protected _address: string;
    protected _payment: string;
    protected _id: string;
    protected _total: number;
    protected events: IEvents;

    get items() {
        return this._items;
    }

    addItem(item: string) {
        this._items = this._items.concat(item);
    }

    set items(items: string[]) {
        this._items = this._items.concat(items);
    }

    get buyingCards() {
        return this._buyingCards;
    }

    set buyingCards(cards: ICard[]) {
        this._buyingCards = cards;
    }

    set id(id: string) {
        this._id = id;
    }

    set email(email: string) {
        this._email = email;
    }

    get email() {
        return this._email;
    }

    set phone(phone: string) {
        this._phone = phone;
    }

    get phone() {
        return this._phone;
    }

    set address(address: string) {
        this._address = address;
    }

    get address(): string {
        return this._address;
    }

    set payment(payment: string) {
        this._payment = payment;
    }

    get payment(): string {
        return this._payment;
    }

    set total(total: number) {
        this._total = total;
    }

    get total() {
        return this._total;
    }

    get count() {
        return this._count;
    }

    updateCount() {
        this._count = this._items.length;
    }

    constructor(events: IEvents) {
        super();
        this._buyingCards = [];
        this._items = [];
        this._total = 0;
        this.events = events;
    }

    addCard(card: ICard) {
        this._buyingCards.push(card);
        this.addPriceToTotal(card.price);
        this._items.push(card.id);
        this.updateCount();
     }

   removeCard(card: ICard) {
       this.minusPriceToTotal(card.price);
        let element = this._buyingCards.indexOf(card);
        if (element !== -1) {
            this.buyingCards.splice(element, 1);
        } else {
            this.buyingCards.pop();
        }

        let index = this._items.indexOf(card.id);
        if (index !== -1) {
            this._items.splice(index, 1);
        }else {
            this._items.pop();
        }
        this.updateCount();
    }

    updateNanCostCard() {
        this.buyingCards.forEach(card => {
            if(card.price == null) {
                this.removeCard(card);
            }
        });
    }

    addPriceToTotal(cardPrice: number) {
        return this._total+=cardPrice;
    }

    minusPriceToTotal(cardPrice: number) {
        return this._total-=cardPrice;
    }
}