import type { Meta, StoryObj } from '@storybook/react';
import OrderHistory from '.';

type Story = StoryObj<typeof OrderHistory>;

/**
 * `OrderHistory` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof OrderHistory> = {
  title: 'Components/mypage/OrderHistory',
  component: OrderHistory,
};

export default meta;

/**
 * `DefaultOrderHistory`는 'OrderHistory' 컴포넌트의 기본 스토리입니다.
 */
const date = new Date('2024-01-01T00:00:00');
export const DefaultOrderHistory: Story = {
  args: {
    date : date,
    children : 'Children Components'
},
};
