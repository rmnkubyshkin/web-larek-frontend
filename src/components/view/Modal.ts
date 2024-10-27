import {IModal, IModalSettings} from "../../types/components/view/IModal";
import {View} from "./View";

/**
 * Отображение модального окна
 */

export class Modal<H, C> extends View<IModal<H, C>, IModalSettings<H, C>>{
    set header(data: H | undefined) {
    }

    set content(data: C) {
    }

    set message(value: string | undefined) {
    }

    set isError(state: boolean) {
    }

    set isActive(state: boolean) {
    }
}
