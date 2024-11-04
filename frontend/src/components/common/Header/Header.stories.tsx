import type { Meta, StoryObj } from '@storybook/react';
import { Header } from '.';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { ComponentProps } from 'react';
import { CartIcon, MiniLogo } from '@/assets/images/svgs';

type Story = StoryObj<typeof Header>;

/**
 * `Header` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof Header> = {
  title: 'Components/common/Header',
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

const Template = (args: ComponentProps<typeof Header>) => {
  const navigate = useNavigate();

  return <Header {...args} onRightIconClick={() => navigate('/cart')} />;
};

/**
 * `DefaultHeader`는 'Header' 컴포넌트의 기본 스토리입니다.
 */
export const DefaultHeader: Story = {
  render: (args) => (
    <Template
      {...args}
      title="마이페이지"
      LeftIcon={<MiniLogo height={50} />}
      RightIcon={<CartIcon height={25} />}
    />
  ),
};
