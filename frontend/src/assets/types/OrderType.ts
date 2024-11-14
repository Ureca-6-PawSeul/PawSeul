import { ProductType } from './ProductType';

export interface OrderHistoryType {
  order_id: string;
  product_img: string;
  order_created_at: Date;
  order_state: string;
  total_price: number;
  order_items: OrderItemType[];
}

export interface OrderItemType {
  productId: string;
  productImg: string;
  title: string;
  price: number;
  quantity: number;
}

export interface OrderType {
  orderItems: ProductType[];
  totalPrice: number;
}

export interface PatchOrderType {
  orderId: string;
  tossOrderKey: string;
  price: number;
}
