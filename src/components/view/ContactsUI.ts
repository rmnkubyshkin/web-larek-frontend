import {IContactsUI} from "../../types/components/view/IContactsUI";

export class ContactsUI implements IContactsUI {
    email: string;
    phoneNumber: string;

    pay(): boolean {
        return true;
    }

    close(): void {

    }
}