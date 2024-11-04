export interface ProductType {
  productId: number | string;
  category?: string;
  productImg: string;
  title: string;
  price: string | number;
  averageScore?: number;
}

export interface ProductDetailType extends ProductType {
  category: string;
  descriptionImg: string[];
  mainIngredient?: string;
  foodFunction?: string;
  targetAge?: string;
  foodType?: string;
  supplementType?: string;
  targetSize?: string;
  isGrainfree?: boolean;
}
