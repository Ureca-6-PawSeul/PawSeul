export interface OrderHistoryType {
    order_id : number | string,
    product_img : string,
    order_created_at : Date,
    order_state: string,
    total_price : number,
    order_items :Array<object>
}
