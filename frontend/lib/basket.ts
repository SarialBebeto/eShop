import { api } from "./api";
import { Product } from "./catalog";

const USER_ID = "demo-user";

export async function addToBasket(product: Product) {
    await api.post("/basket", {
        buyerId: USER_ID,
        items: [
            {
                productId: product.id,
                productName: product.name,
                unitPrice: product.price,
                quantity: 1,
                pictureUri: product.pictureUri,
            },
        ],
    });
}

export type BasketItem = {
    productId: number;
    productName: string;
    unitPrice: number;
    quantity: number;
    pictureUri: string;
};

export type Basket = {
    buyerId: string;
    items: BasketItem[];
};

export async function getBasket(): Promise<Basket> {
    const res = await api.get(`/basket/${USER_ID}`);
    return res.data;
}

export async function updateBasket(basket: Basket) {
    await api.put("/basket", basket);
}

export async function clearBasket() {
    await api.delete(`/basket/${USER_ID}`);
}
