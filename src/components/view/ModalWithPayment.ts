import {Modal} from "../common/Modal";
import {IEvents} from "../base/events";
import {state} from "../../utils/constants";

interface IModalWithPayment {
    valid?: boolean;
    payment: string;
    address: string;
    message: string;
    error: Record<string, string>;
}

export class ModalWithPayment extends Modal<IModalWithPayment> {
    protected _address: HTMLElement;
    protected inputs: NodeListOf<HTMLInputElement>;
    protected _paymentTypeButtonElement: NodeListOf<HTMLButtonElement>;
    protected errors: Record<string, HTMLElement>;
    protected formName: string;
    protected submitButton: HTMLButtonElement;
    protected _fields: HTMLElement;
    protected _buttonActive: HTMLElement;
    protected _form: HTMLFormElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);
        this._fields = this.container.querySelector('.order__field');
        this._form = this.container.querySelector('.form');
        this.formName = this._form.getAttribute('name');
        this._buttonActive = document.querySelector('.button_alt_active');
        this.inputs = this.container.querySelectorAll('.form__input');
        const orderButtons = this.container.querySelector('.order__buttons');
        this._paymentTypeButtonElement = orderButtons.querySelectorAll('.button_payment');
        this._address = this.container.querySelector('.form__input');
        const actions = this._form.querySelector('.modal__actions');
        this.submitButton = actions.querySelector('.button');
        this.errors = {};
        this.inputs.forEach((input) => {
            this.errors[input.name] = this._form.querySelector(`#${input.id}-error`);
        });
        this.submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.events.emit(state.paymentSubmit);
        });

        this._form.addEventListener('input', (event: InputEvent) => {
            event.preventDefault();
            const target = event.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.events.emit(`${this.formName}:addressEntered`, { field, value });
             if (value != "") {
                 this.valid = true;
             } else {
                 this.valid = false;
             }
        });

        orderButtons.addEventListener('click', (evt) => {
            evt.preventDefault();
            const payment = this.getPaymentValue();
            const value: string = payment.name;
            const field: string = `${this.formName}`;
            this.events.emit(`${this.formName}:paymentTypeSelect`, { field, value });
        });
    }

    set address (address: string) {
        this._address.textContent = address;
    }

    getDefaultPayment() {
        return this._buttonActive.textContent;
    }

    protected getPaymentValue() {
       const valueObject: Record<string, string> = {};
        this._paymentTypeButtonElement.forEach((btn) => {
            if (btn.classList.contains('button_alt_active')) {
                btn.classList.remove('button_alt_active');
                btn.classList.add('button_alt');
            } else {
                btn.classList.add('button_alt_active');
                btn.classList.remove('button_alt');
            }
            if (btn.classList.contains('button_alt_active')) {
                valueObject.name = btn.textContent;
            }
        });
        return valueObject;
    }
    protected getInputValues() {
        const valuesObject: Record<string, string> = {};
        this.inputs.forEach((element) => {
            valuesObject[element.name] = element.value;
        });
        return valuesObject;
    }

    set inputValues(data: Record<string, string>) {
        this.inputs.forEach((element) => {
            element.value = data[element.name];
        });
    }

    set error(data: { field: string; value: string; message: string }) {
        if (data.value == "") {
            this.showInputError(data.field, data.message);
        } else {
            this.hideInputError(data.field);
        }
    }

    protected showInputError(field: string, errorMessage: string) {
        this.errors[field].textContent = errorMessage;
    }

    protected hideInputError(field: string) {
        this.errors[field].textContent = '';
    }

    set valid(isValid: boolean) {
        this.submitButton.classList.toggle('disabled', !isValid);
        this.submitButton.disabled = !isValid;
    }

    close() {
        super.close();
        this._form.reset();
        this.inputs.forEach((element) => {
            this.hideInputError(element.name);
        });
    }
    get form() {
        return this.container;
    }
}