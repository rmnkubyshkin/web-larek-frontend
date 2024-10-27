import {
    IOrder,
    PayType,
    IProduct,
    AppStateModals,
    IProfile,
    IOrderResult,
    IAppState,
    IEvents,
    IView,
    IModal,
    IModalSettings, IProductSettings, AppStateChanges
} from '../../types/components/model/IAppState';
import {IMainUI} from "../../types/components/view/IMainUI";

export type EventData = object;
export type EventHandler = (args: EventData) => void;
export type EventsMap = Map<string, Set<EventHandler>>;

export class Product extends ProductSettings implements IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

class ProductSettings implements IProductSettings {
    category: string;
    currency: string;
    description: string;
    image: string;
    isCompact: boolean;
    storageKey: string;
    title: string;

    onChange(changed: AppStateChanges): void {
    }
}

export class Profile implements IProfile {
    deliveryAddress: string;
    phoneNumber: number;
    email: string;

    enterDeliveryAddress(): string {
        return "";
    }
    enterPhoneNumber() : string {
        return "";
    }
    enterEmail(): string {
        return "";
    }
}

export class Order implements IOrder {
    productList: IProduct[];
    totalCost: number;
    payType: PayType;

    removeProduct(id: string): boolean {
        return true;
    }

    selectPayType(): PayType {
        return PayType.Online;
    }

}

export class AppState implements IAppState {
    product? : IProduct[];
    selectedProduct?: IProduct;
    selectedProductDescription: string;
    openedModal: AppStateModals | null;
    basketProduct: IProduct[];
    isOrderReady: boolean;
    validationError: string | null;

    openModal(modal: AppStateModals) {

    }

    selectProduct(id: string) {
        return "";
    }

    fillNumber(contacts: Partial<IProfile>) {

    }

    fillEmail(contacts: Partial<IProfile>) {

    }

    fillPayType(order: Partial<IOrder>) {

    }

    fillAddressDelivery(order: Partial<IOrder>) {

    }


    async orderTickets(): Promise<IOrderResult> {
    }
}

export class EventEmitter implements IEvents {

    events: EventsMap;

    constructor() {
        this.events = new Map<string, Set<EventHandler>>;
    }

    on<T extends object>(event: string, callback: (data: T) => void) {
    }

    emit<T extends object>(event: string, data?: T) {
    }

    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void {
        return;
    }

    addAddressDelivery<T extends object>(event: string, data?: T): string {
        return "";
    }

    addEmail<T extends object>(event: string, data?: T): string {
        return "";
    }

    addPhoneNumber<T extends object>(event: string, data?: T): string {
        return "";
    }

    addProductToBasket<T extends object>(event: string, card: Partial<MainUI>): IProduct {
        return undefined;
    }

    choosePayType<T extends object>(event: string, data?: T): PayType {
        return undefined;
    }

    closePopup<T extends object>(event: string, card: Partial<IMainUI>): void {
    }

    goToMainPage<T extends object>(event: string, data?: T): void {
    }

    openBasket<T extends object>(event: string, basket: Partial<IMainUI>): IProduct[] {
        return [];
    }

    openCard<T extends object>(event: string, card: Partial<IMainUI>): IProduct {
        return undefined;
    }

    order<T extends object>(event: string, data?: T): boolean {
        return false;
    }

    pay<T extends object>(event: string, data?: T): boolean {
        return false;
    }

    removeProduct<T extends object>(event: string, card: Partial<IMainUI>): IProduct {
        return undefined;
    }
}

