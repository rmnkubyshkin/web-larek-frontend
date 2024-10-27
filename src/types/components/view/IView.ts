export interface IView<T, S = object> {
    element: HTMLElement;
    constructor(element: HTMLElement, settings: S);
    copy(settings?: S): IView<T>;
    render(data?: Partial<T>): HTMLElement;
}