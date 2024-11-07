import { CartType } from "@/assets/types/CartType";
import client from "./client";

interface cartRequest {
    carts : CartType[]
  }

export const getCartList = async (): Promise<CartType[]> => {
    const { data } = await client.get<cartRequest>('/cart');
    return data.carts;
  };

export const getProductDetail = async (id: string) => {
  const temp = await client.get(`/product/${id}/detail`);
  return temp.data;
};

export const getProductList = async (category, subCategory ) => {
    // console.log(`product/${category}/${subCategory}`)
    const { data } = await client.get(`product?category=${category}&subcategory=${subCategory}`, {
        withCredentials: true,
    })

   return data.data;
}

export const getTopProductList = async ( ) => {
    // console.log(`api/product/${category}`)
    const {data} = await client.get(`product/topTen`, {
        withCredentials: true,
    })

    return data.data;
}