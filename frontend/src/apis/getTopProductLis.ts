import client from "./client";

export const getTopProductList = async ( ) => {
    // console.log(`api/product/${category}`)
    const {data} = await client.get(`product/topTen`, {
        withCredentials: true,
    })

    return data.data;
}
