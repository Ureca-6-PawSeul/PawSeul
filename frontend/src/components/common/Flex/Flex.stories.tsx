import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from '.';
import { colors } from '@styles/colors';

type Story = StoryObj<typeof Flex>;

/**
 * `Flex` 컴포넌트는 display가 flex인 div 컴포넌트입니다.
 */
const meta: Meta<typeof Flex> = {
  title: 'Components/common/Flex',
  parameters: { componentSubtitle: 'flex box' },
  component: Flex,
};

export default meta;

/**
 * `DefaultFlex`는 플렉스박스 컴포넌트의 기본 `Flex` 스토리입니다.
 */
export const Default: Story = {
  args: {
    width: 100,
    height: 100,
    backgroundColor: colors.MainColor,
  },
};

export const Column: Story = {
  args: {
    width: 100,
    height: 100,
    direction: 'column',
    backgroundColor: colors.MainColor,
  },
};
