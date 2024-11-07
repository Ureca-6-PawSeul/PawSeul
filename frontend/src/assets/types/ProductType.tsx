export interface ProductType {
  productId: string;
  category?: string;
  productImg: string;
  title: string;
  price: number;
  averageScore?: number;
  quantity?: number;
  imgWidth?: string;
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
