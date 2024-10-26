import type { Meta, StoryObj } from '@storybook/react';
import {Product} from '.';

type Story = StoryObj<typeof Product>;

/**
 * `Product` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof Product> = {
  title: 'Components/common/Product',
  component: Product,
};

export default meta;

/**
 * `DefaultHeader`는 'Header' 컴포넌트의 기본 스토리입니다.
 */
export const DefaultHeader: Story = {
  args: {},
};
