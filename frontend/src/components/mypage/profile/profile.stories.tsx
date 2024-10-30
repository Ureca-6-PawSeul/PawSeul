import type { Meta, StoryObj } from '@storybook/react';
import Profile from '.';

type Story = StoryObj<typeof Profile>;

/**
 * `Profile` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof Profile> = {
  title: 'Components/mypage/Profile',
  component: Profile,
};

export default meta;

/**
 * `DefaultProfile`는 'Profile' 컴포넌트의 기본 스토리입니다.
 */
export const DefaultProfile: Story = {
  args: {
    petname:"버블",
    age:4,
    weight:5.4,
    gender: "남자",
    breedname: "골든 리트리버",
    is_neutered: "완료"
},
};
