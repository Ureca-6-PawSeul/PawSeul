import client from "./client";

export const getProductList = async (category, subCategory, setProductDataList ) => {
    // console.log(`api/product/${category}`)
    const {data} = await client.get(`/product?category=${category}&subcategory=${subCategory}`)
    console.log(`/product?category=${category}&subcategory=${subCategory}`)
    // console.log(data.data)
    setProductDataList(data.data)
}
