
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

export interface EventEmitter {
    events : EventsMap;

    on(event:string, handler: EventHandler): void;
    emit(event:string, data: object): void;
}

