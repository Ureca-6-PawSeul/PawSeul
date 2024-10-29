import styled from '@emotion/styled';
import { Flex } from '../Flex';
import { Text } from '../Typo';
import { colors } from '@styles/colors';

const Button = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      backgroundColor={colors.Gray100}
      padding="50px 15px"
      gap={10}
    ></Flex>
  );
};

export default Button;
