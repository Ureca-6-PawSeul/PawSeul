import styled from '@emotion/styled';
import { Flex } from '../../common/Flex';
import { colors } from '@styles/colors';

const Select = ({
  optionList,
  color,
  disabled
}: {
  optionList: Array<string>;
  color?: string;
  disabled?:boolean;
}) => {
  return (
    <Flex height={50} align="center" justify="center">
      <SelectHolder color={color || colors.Gray800} disabled={disabled}>
        {optionList.map((option, index) =>
          index == 0 ? (
            <option key={index} value={option} selected>
              {option}
            </option>
          ) : (
            <option key={index} value={option}>
              {option}
            </option>
          ),
        )}
      </SelectHolder>
    </Flex>
  );
};

export default Select;

const SelectHolder = styled.select<{ color: string, disabled : boolean }>`
  border-color: ${colors.Gray600};
  border-radius: 10px;
  padding: 12px;
  color: ${({ color }) => (color ? color : colors.Gray700)};
  width: 100%;
  font-size: 1rem;
  opacity: ${({disabled})=>(disabled ? 0.3 : 1)};
`;
