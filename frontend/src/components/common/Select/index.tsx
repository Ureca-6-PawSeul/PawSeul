import { Flex } from "../Flex";

const Select = ({optionList} : {optionList : Array<string>}) => {
    return (
        <Flex>
            <select>
                {optionList.map((option, index) => (
                    index == 0 ? 
                        <option key={index} value={option} selected>{option}</option>
                        :
                        <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </Flex>
    )
}

export default Select