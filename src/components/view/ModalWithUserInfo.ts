import {Modal} from "../common/Modal";
import {IEvents} from "../base/events";
import {state} from "../../utils/constants";

interface IModalWithUserInfo {
    valid: boolean;
    email: string;
    phone: string;
    message: string;
    error: Record<string, string>;
}

export class ModalWithUserInfo extends Modal<IModalWithUserInfo> {
    protected _email: HTMLElement;
    protected _phone: HTMLElement;
    protected _fields: HTMLElement;
    protected inputs: NodeListOf<HTMLInputElement>;
    protected errors: Record<string, HTMLElement>;
    protected formName: string;
    protected submitButton: HTMLButtonElement;
    protected _form: HTMLFormElement;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container, events);
        this._form = this.container.querySelector('.form');
        this.formName = this._form.getAttribute('name');
        this.inputs = this.container.querySelectorAll('.form__input');
        this._fields = this.container.querySelector('.order__field');
        this._email = this.container.querySelector('#email');
        this._phone = this.container.querySelector('#phone');
        const actions = this._form.querySelector('.modal__actions');
        this.submitButton = actions.querySelector('.button');
        this.errors = {};
        this.inputs.forEach((input) => {
            this.errors[input.name] = this._form.querySelector(`#${input.id}-error`);
        });
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.events.emit(`${this.formName}:submit`, this.getInputValues());
        });
        this._form.addEventListener('input', (event: InputEvent) => {
            const target = event.target as HTMLInputElement;
            const field = target.name;
            const value = target.value;
            this.events.emit(`${this.formName}:input`, { field, value });
        });
        this.submitButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this.events.emit(state.userInfoSubmit);
        });
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

    set valid(isValid: boolean) {
        this.submitButton.classList.toggle('disabled', !isValid);
        this.submitButton.disabled = !isValid;
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

    close() {
        super.close();
        this._form.reset();
    }
}