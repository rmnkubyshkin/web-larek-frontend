import {IEvents} from "../base/events";
import {ICard} from "../../types";
import {Component} from "../base/Component";
import {CDN_URL} from "../../utils/constants";

export class CardView extends Component<ICard>{
    protected events: IEvents;
    protected _image?: HTMLImageElement;
    protected _title: HTMLElement;
    protected _category?: HTMLElement;
    protected _description?: HTMLElement;
    protected _price: HTMLElement;
    protected _id: string;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this._image = this.container.querySelector('.card__image');
        this._title = this.container.querySelector('.card__title');
        this._description = this.container.querySelector('.card__text');
        this._category = this.container.querySelector('.card__category');
        this._price = this.container.querySelector('.card__price');
        if (this.container.querySelector('.card__button')) {
            const removeButton  = this.container.querySelector('.card__button');
            removeButton.addEventListener('click', () => {
                this.events.emit('card:deleted', {card: this})
            });
        } else {
            this.container.addEventListener('click', () => {
                this.events.emit('card:select', {card: this})
            });
        }

    }
    get id() {
        return this._id;
    }
    removeCard() {
        this.container.remove();
    }
    set id(id: string) {
        this._id = id;
    }

    render(cardData?: Partial<ICard>): HTMLElement;

    render(cardData: Partial<ICard> | undefined): HTMLElement {
        if (!cardData) {
            return this.container;
        } else {
            this._price.textContent = String(cardData.price);
            return super.render(cardData);
        }
    }

    set category(category: string) {
        this._category.textContent = category;
    }
    set price(price: number) {
        price === null? this._price.textContent = "Бесценно":
            this._price.textContent = String(price) + " синапсов";
    }

    set title(title: string) {
        this._title.textContent = title;
    }

    set image(image: string) {
        this._image.src = `${CDN_URL}${image}`;
    }

    set description(description: string) {
        if(this._description) {
            this._description.textContent = description;
        }
    }
}