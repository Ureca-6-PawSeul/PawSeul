import type { Meta, StoryObj } from '@storybook/react';
import Star from '.';

type Story = StoryObj<typeof Star>;

/**
 * `Star` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof Star> = {
  title: 'Components/common/Star',
  component: Star,
};

export default meta;

/**
 * `DefaultHeader`는 'Star' 컴포넌트의 기본 스토리입니다.
 */
export const DefaultHeader: Story = {
  args: { score: 3.4 },
};
