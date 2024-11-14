import { ProductType } from './ProductType';

export interface OrderHistoryType {
  orderId: string;
  productImg: string;
  orderCreatedAt: Date;
  orderState: string;
  totalPrice: number;
  orderItems: OrderItemType[];
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
