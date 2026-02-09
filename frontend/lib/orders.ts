import { api } from "./api";
import { Basket } from "./basket";

const USER_ID = "demo-user";

export async function placeOrder(basket: Basket) {
    await api.post("/orders", {
        buyerId: USER_ID,
        items: basket.items.map(item => ({
            productId: item.productId,
            productName: item.productName,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            pictureUri: item.pictureUri,
        })),
    });
}