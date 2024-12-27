import {Modal} from "../common/Modal";
import {IEvents} from "../base/events";
import {CDN_URL, state} from "../../utils/constants";

interface IModalWithCard {
    currentCard: {
        image?: string;
        category?: string;
        title: string;
        description?: string;
        price: number;
        id: string;
    }
}

export class ModalWithCard extends Modal<IModalWithCard> {
    protected _card: HTMLElement;
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;
    protected _title: HTMLElement;
    protected _description: HTMLElement;
    protected _price: HTMLElement;
    protected _id: string;
    protected _placeToBasketButton: HTMLButtonElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);
        this._card = this.container.querySelector('.card');
        this._image = this.container.querySelector('.card__image');
        this._category = this.container.querySelector('.card__category');
        this._title = this.container.querySelector('.card__title');
        this._description = this.container.querySelector('.card__text');
        this._price = this.container.querySelector('.card__price');
        this._placeToBasketButton = this.container.querySelector('.button');
        this._placeToBasketButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.events.emit(state.cardSubmit, this.getInputValues());
        });
    }

    protected toggleButtonSubmitStatus(valid: boolean) {
        this._placeToBasketButton.classList.toggle('disabled', !valid);
        this._placeToBasketButton.disabled = !valid;
    }

    set currentCard({id, image, category, title, description, price} :
                 {id: string, image: string, category: string, title: string, description: string, price: number}) {

        this._image.src = `${CDN_URL}${image}`;
        this._category.textContent = category;
        this._id = id;
        this._title.textContent = title;
        this._description.textContent = description;
        if (price != null) {
            this._price.textContent = `${price} синапсов`;
        } else {
            this._price.textContent = 'Бесценно';
        }
        super.open();
    }

    protected getInputValues() {
        let valuesObject = {};
        valuesObject = {
            'image' : this._image.src,
            'category' : this._category.textContent,
            'title' : this._title.textContent,
            'description' : this._description.textContent,
            'price' : this._price.textContent,
        };
        return valuesObject;
    }

    close() {
        super.close();
    }
}