import {Modal} from "../common/Modal";
import {IEvents} from "../base/events";

interface IModalConfirm {
    total: string;
}

export class ModalWithConfirm extends Modal<IModalConfirm> {
    protected _description: HTMLImageElement;
    protected successButtonElement: HTMLButtonElement;
    protected _form: HTMLElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);
        this._form = this.container.querySelector('.modal__content').querySelector('.order-success');
        this._description = this._form.querySelector('.film__description');
        this.successButtonElement = this._form.querySelector('.order-success__close');

        this.successButtonElement.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.events.emit(`order:complete`);
        });
    }
    set description(total: number) {
        this._description.textContent = `Списано ${total} синапсов`;
    }
}