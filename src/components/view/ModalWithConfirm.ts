import {IEvents} from "../base/events";
import {state} from "../../utils/constants";

export class ModalWithConfirm {
    protected _description: HTMLImageElement;
    protected successButtonElement: HTMLButtonElement;
    protected _form: HTMLElement;
    protected _container: HTMLElement;
    protected _closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        this._container = container;
        this._form = this.container.querySelector('.modal__content').querySelector('.order-success');
        this._closeButton = this.container.querySelector('.modal__close');
        this._description = this._form.querySelector('.film__description');
        this.successButtonElement = this._form.querySelector('.order-success__close');
        this.successButtonElement.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.events.emit(state.orderComplete);
        });
        this._closeButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.events.emit(state.orderComplete);
        });
    }
    set description(total: number) {
        this._description.textContent = `Списано ${total} синапсов`;
    }

    get container(): HTMLElement {
        return this._container;
    }
}