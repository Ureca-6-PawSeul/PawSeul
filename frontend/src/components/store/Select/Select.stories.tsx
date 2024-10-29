import type { Meta, StoryObj } from '@storybook/react';
import Select from '.';

type Story = StoryObj<typeof Select>;

/**
 * `Select` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof Select> = {
  title: 'Components/store/Select',
  component: Select,
};

export default meta;

/**
 * `DefaultSelect`는 'Select' 컴포넌트의 기본 스토리입니다.
 */
export const DefaultSelect: Story = {
  args: {
    // color : colors.MainColor,
    optionList: [
      '배송 요청 사항을 선택해주세요 (선택)',
      '문 앞에 놓아주세요.',
      '배송 전 미리 연락 부탁드립니다.',
      '부재 시 경비실에 맡겨주시기 바랍니다.',
      '택배 보관함에 넣어주시기 바랍니다.',
    ],
  },
};
