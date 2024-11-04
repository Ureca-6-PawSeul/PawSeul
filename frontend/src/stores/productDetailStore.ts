import { create } from 'zustand';
import { ProductDetailType } from '@/assets/types/ProductType';

interface ProductDetailStore {
  productDetail: ProductDetailType | null;
  setProductDetail: (product: ProductDetailType) => void;
}

const useProductDetailStore = create<ProductDetailStore>((set) => ({
  productDetail: null,
  setProductDetail: (product) => set({ productDetail: product}),
}));

export default useProductDetailStore;
