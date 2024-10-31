import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import styled from '@emotion/styled';
import { colors } from '@styles/colors';

interface CheckboxProps {
  isChecked: boolean;
  size?: number;
}

const Checkbox = ({ isChecked, size = 12 }: CheckboxProps) => {
  return (
    <>
      <CheckInput type="checkbox" />
      {isChecked ? <FaCheckSquare size={size} color={colors.MainColor}/> : <FaRegSquare size={size} />}
    </>
  );
};



const CheckInput = styled.input`
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
  width: 24px;
  height: 24px;
`;

export default Checkbox;
