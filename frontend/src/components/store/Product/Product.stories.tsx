import type { Meta, StoryObj } from '@storybook/react';
import {Product} from '.';

type Story = StoryObj<typeof Product>;

/**
 * `Product` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof Product> = {
  title: 'Components/store/Product',
  component: Product,
};

export default meta;

/**
 * `DefaultProduct`는 'Product' 컴포넌트의 기본 스토리입니다.
 *  img의 경우 %로 설정되어 있어서 스토리북에서 보면 꽉 차게 보이겠군요...
 */
export const DefaultProduct: Story = {
  args: {
    "productId": 0,
    "productImg": "https://thumbnail10.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/9dc1/40b1e13b5495b578b95a05980070c5f392dfff722303d78e126f328c7833.jpg",
    "title": "수제명가 애견용 셰프시리즈 건강 한입 간식, 리얼황태, 2개",
    "price": "5,900원",
},
};
