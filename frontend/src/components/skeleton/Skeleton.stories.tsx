import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '.';

type Story = StoryObj<typeof Skeleton>;

/**
 * `Skeleton` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Components/skeleton/Skeleton',
  component: Skeleton,
};

export default meta;

/**
 * `DefaultSkeleton`은 기본 스켈레톤 스토리입니다.
 */
export const DefaultSkeleton: Story = {
  args: {},
};
