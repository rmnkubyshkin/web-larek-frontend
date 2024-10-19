export interface ContactsUI {
    email: string;
    phoneNumber: string;

    pay(): boolean;
    close(): void;
}