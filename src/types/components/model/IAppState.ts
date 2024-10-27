import {IMainUI} from "../view/IMainUI";


export interface IProfile {
    deliveryAddress: string;
    phoneNumber: number;
    email: string;

    enterDeliveryAddress(): string;
    enterPhoneNumber() : string;
    enterEmail(): string;
}

export interface IProduct {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IProductSettings extends IAppStateSettings{
    title: string;
    image: string;
    description: string;
    category: string;
    isCompact: boolean;
}

export enum PayType {
    Online,
    Offline,
}

export interface IOrder {
    productList: IProduct[];
    totalCost: number;
    payType: PayType;

    removeProduct(id: string): boolean;
    selectPayType(type: PayType): void;
}

export interface IOrderResult {
    id: string;
    total: number;
}

export interface IAppState {
    product? : IProduct[];
    selectedProduct?: IProduct;
    selectedProductDescription: string;
    openedModal: AppStateModals | null;
    basketProduct: IProduct[];
    isOrderReady: boolean;
    validationError: string | null;

    openModal(modal: AppStateModals): void;
    selectProduct(id: string): void;
    fillNumber(contacts: Partial<IProfile>): void;
    fillEmail(contacts: Partial<IProfile>): void;
    fillPayType(order: Partial<IOrder>): void;
    fillAddressDelivery(order: Partial<IOrder>): void;
    orderTickets(): Promise<IOrderResult>;
}

export enum AppStateChanges {
    product = 'change:product',
    modal = 'change:modal',
    modalAddressAndPayType = 'change:modalAddressAndPayType',
    modalBasket = 'change:modalBasket',
    modalCard = 'change:modalCard',
    selectedProducts = 'change:selectedProducts',
    modalContacts = 'change:modalContacts',
    basket = 'change:basket',
    order = 'change:order',
}

export enum AppStateModals {
    address = 'modal:address',
    basket = 'modal:basket',
    product = 'modal:product',
    contacts = 'modal:contacts',
    success = 'modal:success',
    none = 'modal:none',
}

export interface IAppStateSettings {
    currency: string;
    storageKey: string;
    onChange: (changed: AppStateChanges) => void;
}

export interface IEvents {
    on<T extends object>(event: string, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
    openCard<T extends object>(event: string, card: Partial<IMainUI>): IProduct;
    openBasket<T extends object>(event: string, basket: Partial<IMainUI>): IProduct[];
    closePopup<T extends object>(event: string, card: Partial<IMainUI>): void;
    removeProduct<T extends object>(event: string, card: Partial<IMainUI>): IProduct;
    addProductToBasket<T extends object>(event: string, card: Partial<IMainUI>): IProduct;
    choosePayType<T extends object>(event: string, data?: T): PayType;
    addAddressDelivery<T extends object>(event: string, data?: T): string;
    addPhoneNumber<T extends object>(event: string, data?: T): string;
    addEmail<T extends object>(event: string, data?: T): string;
    pay<T extends object>(event: string, data?: T): boolean;
    goToMainPage<T extends object>(event: string, data?: T): void;
    order<T extends object>(event: string, data?: T): boolean;
}

type Subscriber = Function;

type EmitterEvent = {
    eventName: string,
    data: unknown
};
