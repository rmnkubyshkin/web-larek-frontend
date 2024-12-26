import {Component} from "../base/Component";
import {IEvents} from "../base/events";

export class Modal<T> extends Component<T> {
    protected content: HTMLElement;
    protected closeButtonElement: HTMLButtonElement;
    protected events: IEvents;

    constructor(protected container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this.content = this.container.querySelector('.modal__content');
        this.closeButtonElement = this.container.querySelector('.modal__close');
        this.closeButtonElement.addEventListener('click', this.close.bind(this));

        this.container.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        });
        this.handleEscUp = this.handleEscUp.bind(this);
    }

    open(){
        this.container.classList.add('modal_active');
        document.addEventListener('keyup', this.handleEscUp);
    }

    close(){
        this.container.classList.remove('modal_active');
        document.removeEventListener('keyup', this.handleEscUp);
    }

    handleEscUp(evt: KeyboardEvent){
        if (evt.key === 'Escape') {
            this.close();
        }
    }
}