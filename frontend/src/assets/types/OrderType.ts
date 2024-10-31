export interface OrderHistoryType {
    order_id : number | string,
    product_img : string,
    order_created_at : Date,
    order_state: string,
    total_price : number,
    order_items :OrderItemType[]
}

export interface OrderItemType {
    product_id :  string,
    product_img : string,
    title : string,
    price: number,
    quantity: number
}
