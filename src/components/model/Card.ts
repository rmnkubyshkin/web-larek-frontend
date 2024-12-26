import {ICard} from "../../types";

export class Card extends Object implements ICard{
    protected _id: string;
    protected _description: string;
    protected _image: string;
    protected _title: string;
    protected _category: string;
    protected _price: number;

    set id(id: string){
        this._id = id;
    }

    get id() {
        return this._id;
    }

    set description(description: string){
        this._description = description;
    }

    get description() {
        return this._description;
    }

    set image(image: string){
        this._image = image;
    }

    get image() {
        return this._image;
    }

    set title(title: string){
        this._title = title;
    }

    get title() {
        return this._title;
    }

    set category(category: string){
        this._category = category;
    }

    get category() {
        return this._category;
    }

    set price(price: number){
        this._price = price;
    }

    get price() {
        return this._price;
    }

    constructor(card: ICard) {
        super();
        this._id = card.id;
        this._description = card.description;
        this._image = card.image;
        this._title = card.title;
        this._category = card.category;
        this._price = card.price;
    }
}
