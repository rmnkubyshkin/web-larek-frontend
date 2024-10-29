
export interface IView<T, S = object> {
    element: HTMLElement;
    copy(settings?: S): IView<T>;
    render(data?: Partial<T>): HTMLElement;
}