import { ProductType } from "./ProductType"

export interface OrderHistoryType {
    order_id : number | string,
    product_img : string,
    order_created_at : Date,
    order_state: string,
    total_price : number,
    order_items :OrderItemType[]
}

export interface OrderItemType {
    productId :  string,
    productImg : string,
    title : string,
    price: number,
    quantity: number
}

export interface OrderType {
    orderId?: string,
    orderItems: ProductType[]
    price: number,
    tossOrderKey: string
}

export interface PatchOrderType {
    orderId: string,
    state: string
}