import type { Meta, StoryObj } from '@storybook/react';
import StickyFooter from '.';

type Story = StoryObj<typeof StickyFooter>;

/**
 * `StickyFooter` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof StickyFooter> = {
  title: 'Components/store/StickyFooter',
  component: StickyFooter,
};

export default meta;

/**
 * `DefaultStickyFooter`는 'StickyFooter' 컴포넌트의 기본 스토리입니다.
 *  bottom에 도달했는지 확인하는 state인 isScorolledToBottom 설정이 필요합니다!
 */
export const DefaultStickyFooter: Story = {
  args: { isScrolledToBottom : false,
    children: 'Sticky Footer Content'
},
};
