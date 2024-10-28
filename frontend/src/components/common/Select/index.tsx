import styled from "@emotion/styled";
import { Flex } from "../Flex";
import { colors } from '@styles/colors';

const Select = ({optionList, color} : {optionList : Array<string>, color ?: string}) => {
    return (
        <Flex height={50} align="center" justify="center">
            <SelectHolder color={color || colors.Gray400}>
                {optionList.map((option, index) => (
                    index == 0 ?
                        <option key={index} value={option} selected>{option}</option>
                        :
                        <option key={index} value={option}>{option}</option>
                ))}
            </SelectHolder>
        </Flex>
    )
}

export default Select;

const SelectHolder = styled.select<{color : string}>`
    border-color: ${({color}) => (color? color : colors.Gray400) };
    border-radius: 10px;
    padding: 0.8rem;
    color: ${({color}) => (color? color : colors.Gray400) };
    width: 100%;
`