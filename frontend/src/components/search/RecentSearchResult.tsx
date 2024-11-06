import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import styled from '@emotion/styled';
import { IoCloseOutline } from 'react-icons/io5';

interface RecentSearchResultProps {
  recentSearchQueries: string[];
  setRecentSearchQueries: (queries: string[]) => void;
}

const RecentSearchResult = ({
  recentSearchQueries,
  setRecentSearchQueries,
}: RecentSearchResultProps) => {
  return (
    <Flex
      padding="40px 24px"
      direction="column"
      gap={16}
      justify="flex-start"
      align="flex-start"
    >
      <Flex width="auto" height="auto" justify="flex-start" gap={12}>
        <Text typo="Heading4">최근 검색어</Text>
        {recentSearchQueries.length > 0 && (
          <ClearButton onClick={() => setRecentSearchQueries([])}>
            <IoCloseOutline size={20} color={colors.Gray400} />
          </ClearButton>
        )}
      </Flex>

      {recentSearchQueries.length > 0 ? (
        <RecentWrapper gap={8} justify="flex-start" align="flex-start" height='auto' width='auto'>
          {recentSearchQueries.map((recent, index) => (
            <RecentItem
              padding="8px 20px"
              backgroundColor={colors.Gray50}
              width="fit-content"
              height="fit-content"
              key={index}
            >
              <Text typo="Label2" colorCode={colors.Gray500}>
                {recent}
              </Text>
            </RecentItem>
          ))}
        </RecentWrapper>
      ) : (
        <Text typo="Body2" colorCode={colors.Gray400}>최근 검색어가 없습니다.</Text>
      )}
    </Flex>
  );
};

const RecentWrapper = styled(Flex)`
  flex-wrap: wrap;
`;
const RecentItem = styled(Flex)`
  border-radius: 70px;
`;

const ClearButton = styled.button`
  border: none;
  outline: none;
  background-color: inherit ;
  cursor: pointer;
  padding: 2px 0 0 0;
`;

export default RecentSearchResult;
