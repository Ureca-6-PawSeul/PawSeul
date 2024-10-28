import type { Meta, StoryObj } from '@storybook/react';
import {ProductHorizontal} from './ProductHorizontal';

type Story = StoryObj<typeof ProductHorizontal>;

/**
 * `Product` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof ProductHorizontal> = {
  title: 'Components/store/Product',
  component: ProductHorizontal,
};

export default meta;

/**
 * `DefaultProductHorizontal`는 'ProductHorizontal' 컴포넌트의 기본 스토리입니다.
 *  Product의 세로버전 컴포넌트입니다.
 */
export const DefaultProductHorizontal: Story = {
  args: {
    "index": 0,
    "product_img": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/9dc1/40b1e13b5495b578b95a05980070c5f392dfff722303d78e126f328c7833.jpg",
    "title": "수제명가 애견용 셰프시리즈 건강 한입 간식, 리얼황태, 2개",
    "price": "5,900원",
},
};
