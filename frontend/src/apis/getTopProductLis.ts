import client from "./client";

export const getTopProductList = async (setProductList ) => {
    // console.log(`api/product/${category}`)
    const {data} = await client.get(`api/product/top`)
    setProductList(data)
}
