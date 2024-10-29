import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '.';

type Story = StoryObj<typeof Modal>;

/**
 * `Modal` 컴포넌트의 스토리북 정의입니다.
 */
const meta: Meta<typeof Modal> = {
  title: 'Components/common/Modal',
  component: Modal,
};

export default meta;

/**
 * `DefaultModal`는 'Modal' 컴포넌트의 기본 스토리입니다.
 */
export const DefaultModal: Story = {
  args: {
    isOpen: true,
    toggleModal: () => {},
    children: (
      <div>
        <div>포슬 모달</div>
        <button>포슬포슬</button>
      </div>
    ),
  },
};
