import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '.';

type Story = StoryObj<typeof Footer>;

/**
 * `Footer` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof Footer> = {
  title: 'Components/common/Footer',
  component: Footer,
};

export default meta;

/**
 * `Default`는 `Footer` 컴포넌트의 기본 스토리입니다.
 */
export const DefaultFooter: Story = {
  args: {},
};
