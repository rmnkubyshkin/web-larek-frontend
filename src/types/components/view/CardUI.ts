
export interface CardUI {
    title: string;
    image: string;
    description: string;
    price: string;
    category: string;
    buyProduct(id: string) : void;
    close(): void;
}
