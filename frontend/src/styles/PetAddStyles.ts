import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { colors } from '@styles/colors';

const Container = styled(Flex)`
  background-color: ${colors.White};
  border: 1px ${colors.Black} solid;
`;

const Input = styled.input`
  width: -webkit-fill-available;
  padding: 10px 20px;
  border: 2px solid ${colors.Gray100};
  border-radius: 5px;

  &:focus {
    border-color: ${colors.MainColor};
    outline: none;
  }
`;

const ButtonContainer = styled(Flex)`
  border-radius: 5px;
  justify-content: space-between;
`;

const MaleBtn = styled.button`
  width: 48%;
  padding: 10px;
  background-color: ${colors.White};
  border: 2px solid ${colors.Gray100};
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.MainColor};
    border: 2px solid ${colors.MainColor};
    color: ${colors.White};
    font-weight: bold;
  }
`;

const FemaleBtn = styled(MaleBtn)``;

const AgeSelect = styled.select`
  width: 100%;
  padding: 10px 15px;
  border: 2px solid ${colors.Gray100};
  border-radius: 5px;

  &:focus {
    border-color: ${colors.MainColor};
    outline: none;
  }
`;

const YesBtn = styled.button`
  width: 100%;
  padding: 10px 20px;
  background-color: ${colors.White};
  border: 2px solid ${colors.Gray100};
  border-radius: 5px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: ${colors.MainColor};
    border: 2px solid ${colors.MainColor};
    color: ${colors.White};
    font-weight: bold;
  }
`;

const NoBtn = styled(YesBtn)``;

const Guide = styled.p`
  text-align: left;
  margin-bottom: 10px;
  color: ${colors.Gray400};
  font-size: 12px;
`;

const NextButton = styled.button`
  background-color: ${colors.MainColor};
  color: ${colors.White};
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  font-weight: bold;

  &:hover {
    background-color: ${colors.Mint200};
  }
`;

export {
  Container,
  Input,
  ButtonContainer,
  MaleBtn,
  FemaleBtn,
  AgeSelect,
  YesBtn,
  NoBtn,
  Guide,
  NextButton,
};
