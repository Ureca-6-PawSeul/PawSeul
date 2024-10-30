import { FaCheckSquare, FaRegSquare } from 'react-icons/fa';
// import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import styled from '@emotion/styled';

interface CheckboxProps {
  isChecked: boolean;
  size?: number;
}

const Checkbox = ({ isChecked, size = 12 }: CheckboxProps) => {
  return (
    <>
      <CheckInput type="checkbox" />
      {isChecked ? <FaCheckSquare size={size} /> : <FaRegSquare size={size} />}
      {/* {isChecked ? <FaCheckCircle size={size} /> : <FaRegCircle size={size} />} */}
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
