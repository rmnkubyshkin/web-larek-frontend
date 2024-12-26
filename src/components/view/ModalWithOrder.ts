import {IEvents} from "../base/events";
import {Modal} from "../common/Modal";

interface IModalWithOrder {
    cards?: string[];
    total: number;
}

export class ModalWithOrder extends Modal<IModalWithOrder> {
    protected _items: NodeListOf<HTMLElement>;
    protected _total: HTMLElement;
    protected _index: HTMLElement;
    protected _orderButtonElement: HTMLButtonElement;
    protected events: IEvents;
    protected _basket: HTMLElement;
    protected _basketCount: HTMLElement;
    protected _removeButtonElement: HTMLButtonElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);
        this.events = events;
        this._items = document.querySelectorAll('.basket__item');
        this._index = document.querySelector('.basket__item-index');
        this._basketCount = document.querySelector('.header__basket-counter');
        this._basket = document.querySelector('.basket__list');
        const actions = document.querySelector('.modal__actions');
        this._orderButtonElement = actions.querySelector('.button');
        this._removeButtonElement = this.container.querySelector('.basket__item-delete');
        this._total = actions.querySelector('.basket__price');
        this._orderButtonElement.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.events.emit('order:submit', this.getOrder());
        });
        this._items.forEach(card => {
            card.remove();
        });
        this.total = 0;
    }

    updateButtonSubmitStatus() {
        let valid = this._total.textContent != "0 Синапсов";
        this._orderButtonElement.classList.toggle('disabled', !valid);
        this._orderButtonElement.disabled = !valid;
    }

    set total(total: number) {
        this._total.textContent = `${total} Синапсов`;
        this.updateButtonSubmitStatus();
    }

    set basketCount(count: number) {
        this._basketCount.textContent = String(count);
    }
    get basketCount() {
        return Number(this._basketCount.textContent);
    }

    updateIndex() {
        let counter = 1;
        const items = this._basket.querySelectorAll('.basket__item');
        items.forEach((item) => {
            const index = item.querySelector('.basket__item-index');
            index.textContent = String(counter);
            counter += 1;
        });
    }

    set items(items: HTMLElement) {
        this._basket.appendChild(items);
        this.updateIndex();
        this.updateButtonSubmitStatus();
        const cardsInBasket = this._basket.querySelectorAll('.basket__item-delete');
        cardsInBasket.forEach((item) => {
            item.addEventListener('click', (evt) => {
                evt.preventDefault();
                item.parentElement.remove();

                this.updateIndex();
                this.updateButtonSubmitStatus();
            });
        });

        this.events.emit('order:itemsCountUpdate');
    }

    getOrder(){
        const values = [];
        let title;
        let price;
        this._items.forEach((element) => {
            title = element.querySelector('.card__title');
            price = element.querySelector('.card__price');
            values.push({'title' : title.textContent, 'price' : price.textContent});
        });
        values.push({'total' : this._total.textContent})
        return values;
    }

    getItems() : NodeListOf<HTMLElement> {
        return this._items;
    }

}