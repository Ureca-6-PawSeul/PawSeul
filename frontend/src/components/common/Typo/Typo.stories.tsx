import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '.';
import { KeyOfMobileTypo, KeyOfWebTypo, theme } from '@styles/theme';

type Story = StoryObj<typeof Text>;

/**
 * `Text` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof Text> = {
  title: 'Components/common/Text',
  component: Text,
  argTypes: {
    webTypo: {
      control: 'select',
      options: Object.keys(theme.typo.Web) as KeyOfWebTypo[], // Web 타이포 옵션
    },
    mobileTypo: {
      control: 'select',
      options: Object.keys(theme.typo.Mobile) as KeyOfMobileTypo[], // Mobile 타이포 옵션
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
export const Default: Story = {
  args: {
    webTypo: 'Heading1_Kor',
    mobileTypo: 'Heading1_Kor',
    colorCode: '#000000',
    margin: '0',
    children: 'This is a sample text',
  },
};
