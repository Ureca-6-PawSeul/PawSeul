export interface ReviewType {
  productReviewId: number | string;
  productId: number | string;
  text: string;
  score: number;
  pet: {
    petname: string;
    age: number;
    weight: number;
  };
  createdAt: string;
}
