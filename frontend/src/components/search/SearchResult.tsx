import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import styled from '@emotion/styled';

interface SearchResultProps {
  searchResults: string[];
}

const SearchResult = ({searchResults}: SearchResultProps) => {
  return (
    searchResults.length > 0 ? (
      <Flex direction="column" justify="flex-start">
        {searchResults.map((result, index) => (
          <ResultWrapper
            padding="16px 24px"
            key={index}
            height="fit-content"
            justify="flex-start"
            align="flex-start"
            direction="column"
          >
            <ResultText typo="Body2" colorCode={colors.Gray700}>
              {result}
            </ResultText>
          </ResultWrapper>
        ))}
      </Flex>
    ) : (
      <Text>검색한 결과가 없습니다.</Text>
    )
  );
}

const ResultWrapper = styled(Flex)`
  border-bottom: 1px solid ${colors.Gray100};
`;

const ResultText = styled(Text)`
  font-size: 15px;
  line-height: 150%;
`;

export default SearchResult;