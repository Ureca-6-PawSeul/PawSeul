import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '.';
import { KeyOfTypo, theme } from '@styles/theme';

type Story = StoryObj<typeof Text>;

/**
 * `Text` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof Text> = {
  title: 'Components/common/Text',
  component: Text,
  argTypes: {
    typo: {
      control: 'select',
      options: Object.keys(theme.typo) as KeyOfTypo[], // Web 타이포 옵션
    },
    colorCode: {
      control: 'color',
    },
    margin: {
      control: 'text',
    },
  },
};

export default meta;

/**
 * `DefaultText`는 `Text` 컴포넌트의 기본 스토리입니다.
 */
export const DefaultText: Story = {
  args: {
    typo: 'Heading1',
    colorCode: '#000000',
    margin: '0',
    children: 'This is a sample text',
  },
};
