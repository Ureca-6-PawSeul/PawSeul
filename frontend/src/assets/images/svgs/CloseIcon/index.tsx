import styled from '@emotion/styled';

export interface CloseProps {
  width?: number;
  height?: number;
  margin?: string;
  isOpen: boolean;
  toggleModal: () => void;
}

export const CloseIcon = (props: CloseProps) => {
  const { width, height, margin, isOpen, toggleModal } = props;

  return (
    <CloseBox onClick={toggleModal}>
      <svg
        width={width ?? '21'}
        height={width ?? '21'}
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L19 19M19 2L2 19"
          stroke="#787E88"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </CloseBox>
  );
};

const CloseBox = styled.div<{
  width?: number;
  height?: number;
  margin?: string;
}>`
  width: ${({ width }) => width ?? '21px'};
  height: ${({ height }) => height ?? '21px'};
  margin: ${({ margin }) => margin ?? ''};
  &:hover {
    cursor: pointer;
  }
`;
