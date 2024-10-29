export interface ReviewType {
  product_review_id: number;
  product_id: number;
  text: string;
  score: number;
  pet: {
    petname: string;
    age: number;
    weight: number;
  };
  created_at: string;
}