import {IMainUI} from "./IMainUI";

export interface IContactsUI extends IMainUI{
    email: string;
    phoneNumber: string;

    pay(): boolean;
    close(): void;
}