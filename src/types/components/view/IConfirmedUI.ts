import {IMainUI} from "./IMainUI";

export interface IConfirmedUI  extends IMainUI{
    total: string;
    title: string;
    image: string;
    backToMain(): void;
    close(): void;
}