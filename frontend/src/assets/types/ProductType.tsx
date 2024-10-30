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
  main_ingredient?: string;
  food_function?: string;
  target_age?: string;
  food_type?: string;
  supplemment_type?: string;
  target_size?: string;
  is_grainfree?: boolean;
}
