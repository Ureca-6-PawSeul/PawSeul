export interface ProductType {
  index: number;
  product_img: string;
  title: string;
  price: string;
  // score: number;
}

export interface ProductDetailType extends ProductType {
  category: string;
  description_img: string[];
  food_function: string;
  food_type: string;
  is_grainfree: boolean;
  main_ingredient: string;
  target_age: string;
  target_size: string;
}
