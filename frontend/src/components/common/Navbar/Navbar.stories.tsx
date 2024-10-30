import type { Meta, StoryObj } from '@storybook/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Navbar from '.';
import { BrowserRouter } from 'react-router-dom';

type Story = StoryObj<typeof Navbar>;

/**
 * `Navbar` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof Navbar> = {
  title: 'Components/common/Navbar',
  component: Navbar,
};

export default meta;

/**
 * `DefaultNavbar`는 `Navbar` 컴포넌트의 기본 스토리입니다.
 */
const Template: ComponentStory<typeof Navbar> = (args) => (
  <BrowserRouter>
    <Navbar {...args} />
  </BrowserRouter>
);

/**
 * 기본 스토리 정의
 */
export const DefaultNavbar = Template.bind({});
DefaultNavbar.args = {};
