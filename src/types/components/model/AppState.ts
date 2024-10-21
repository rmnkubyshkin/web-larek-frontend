
export type EventData = object;
export type EventHandler = (args: EventData) => void;
export type EventsMap = Map<string, Set<EventHandler>>;

export interface Profile {
    deliveryAddress: string;
    phoneNumber: number;
    email: string;

    enterDeliveryAddress(): string;
    enterPhoneNumber() : string;
    enterEmail(): string;
}

export interface Product {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}


export interface ProductSettings extends AppStateSettings{
    title: string;
    image: string;
    description: string;
    price: string;
    category: string;
    isCompact: boolean;
}

export enum PayType {
    Online,
    Offline,
}

export interface Order extends Profile, AppState{
    productList: Product[];
    totalCost: number;
    payType: PayType;

    removeProduct(id: string): boolean;
    selectPayType(): PayType;
}

export interface OrderResult {
    id: string;
    total: number;
}

export interface AppState {
    product? : Product[];
    selectedProduct?: Product;
    selectedProductDescription: string;
    openedModal: AppStateModals | null;
    basketProduct: Product[];
    isOrderReady: boolean;
    validationError: string | null;

    openModal(modal: AppStateModals): void;
    selectProduct(id: string): void;
    fillNumber(contacts: Partial<Profile>): void;
    fillEmail(contacts: Partial<Profile>): void;
    fillPayType(order: Partial<Order>): void;
    fillAddressDelivery(order: Partial<Order>): void;
    orderTickets(): Promise<OrderResult>;
}


export enum AppStateChanges {
    product = 'change:product',
    modal = 'change:modal',
    modalAddressAndPayType = 'change:modalAddressAndPayType',
    modalBin = 'change:modalBin',
    modalCard = 'change:modalCard',
    selectedProducts = 'change:selectedProducts',
    modalContacts = 'change:modalContacts',
    basket = 'change:basket',
    order = 'change:order',
}

export enum AppStateModals {
    bin = 'modal:bin',
    address = 'modal:address',
    basket = 'modal:basket',
    product = 'modal:product',
    contacts = 'modal:contacts',
    success = 'modal:success',
    none = 'modal:none',
}

export interface AppStateSettings {
    currency: string;
    storageKey: string;
    onChange: (changed: AppStateChanges) => void;
}

export interface ModalData<H, C> {
    header?: H;
    content: C;
    message?: string;
    isActive: boolean;
    isError?: boolean;
}

export interface ModalSettings<H, C> {
    close: string;
    header: string;
    content: string;
    footer: string;
    message: string;
    headerView: IView<H>;
    contentView: IView<C>;
    actions: HTMLElement[];
    activeClass: string;
    messageErrorClass: string;
    onOpen?: () => void;
    onClose?: () => void;
}

export interface IView<T, S = object> {
    element: HTMLElement;
    copy(settings?: S): IView<T>;
    render(data?: Partial<T>): HTMLElement;
}

interface IEvents {
    on<T extends object>(event: string, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

type Subscriber = Function;

type EmitterEvent = {
    eventName: string,
    data: unknown
};

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
}

