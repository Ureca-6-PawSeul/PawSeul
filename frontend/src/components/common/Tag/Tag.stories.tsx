import type { Meta, StoryObj } from '@storybook/react';
import Tag from '.';

type Story = StoryObj<typeof Tag>;

/**
 * `Tag` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof Tag> = {
  title: 'Components/common/Tag',
  component: Tag,
};

export default meta;

/**
 * `DefaultTag`는 'Tag' 컴포넌트의 기본 스토리입니다.
 *  "BorderGray" "BorderMainColor" "FilledGray" "FilledMainColor"
 */
export const DefaultTag: Story = {
  args: {
    height: 50,
    colorCode : "BorderMainColor",
    children: "Button"
  },
};
