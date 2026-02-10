import { api } from "./api";

export type Product = {
  id: number;
  name: string;
  price: number;
  pictureUri: string;
};

export async function getProducts(): Promise<Product[]> {
  // Use the axios instance baseURL; pass a relative path so baseURL is applied.
  const res = await api.get('/catalog/items');
  return res.data;
}