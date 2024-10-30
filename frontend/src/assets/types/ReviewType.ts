export interface ReviewType {
  product_review_id: number | string;
  product_id: string;
  text: string;
  score: number;
  pet: {
    petname: string;
    age: number;
    weight: number;
  };
  created_at: string;
}
