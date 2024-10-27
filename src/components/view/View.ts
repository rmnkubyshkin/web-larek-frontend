import {IView} from "../../types/components/view/IView";

export abstract class View<T, S extends object> implements IView<T, S> {
    element: HTMLElement;

    copy(settings?: S): IView<T> {
        return;
    }

    render(data?: Partial<T>): HTMLElement {
        return;
    }
}