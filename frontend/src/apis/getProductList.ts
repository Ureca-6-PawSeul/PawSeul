import client from "./client";

export const getProductList = async (category, subCategory ) => {
    console.log(`product/${category}/${subCategory}`)
    const { data } = await client.get(`product?category=${category}&subcategory=${subCategory}`, {
        withCredentials: true,
    })

   return data.data;
}
