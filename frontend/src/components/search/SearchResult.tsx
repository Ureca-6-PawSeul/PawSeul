import { Flex } from '@components/common/Flex';
import { Text } from '@components/common/Typo';
import { colors } from '@styles/colors';
import styled from '@emotion/styled';
import { ProductType } from '@/assets/types/ProductType';
import { IoSearch } from 'react-icons/io5';
import { n } from 'node_modules/msw/lib/core/GraphQLHandler-udzgBRPf';
import { useNavigate } from 'react-router-dom';
import { CartEmptyBlack, NotFound } from '@/assets/images/svgs';
import { Product } from '../store/Product';
interface SearchResultProps {
  searchResults: ProductType[];
  searchQuery: string;
  isSearchComplete: boolean;
}

const SearchResult = ({
  searchResults,
  searchQuery,
  isSearchComplete,
}: SearchResultProps) => {
  const navigate = useNavigate();

  const handleResultClick = (productId: string) => {
    navigate('/store/detail/' + productId);
  };

  const highlightText = (text: string) => {
    if (!searchQuery) return text;

    const regex = new RegExp(`(${searchQuery})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <StyledMark key={index}>{part}</StyledMark>
      ) : (
        part
      ),
    );
  };

  return isSearchComplete ? (
    searchResults.length > 0 ? (
      <Wrapper
        direction="row"
        justify="flex-start"
        align="flex-start"
        gap={35}
        padding="24px 0 84px 35px"
      >
        {searchResults.map((item, index) => (
          <ProductWrapper
            key={index}
            onClick={() => handleResultClick(item.productId)}
          >
            <Product
              productId={item.productId}
              productImg={item.productImg}
              title={item.title}
              price={item.price}
              averageScore={item.averageScore}
            />
          </ProductWrapper>
        ))}
      </Wrapper>
    ) : (
      <Flex backgroundColor={colors.White} padding="0 0 72px 0">
        <NotFound width="180px" />
      </Flex>
    )
  ) : searchResults.length > 0 ? (
    <Flex direction="column" justify="flex-start" padding="8px 24px">
      {searchResults.map((result, index) => (
        <ResultWrapper
          padding="16px 24px 16px 0"
          key={index}
          height="fit-content"
          justify="flex-start"
          gap={12}
        >
          <IconWrapper>
            <IoSearch size={16} color={colors.Gray200} />
          </IconWrapper>
          <ResultText
            typo="Body2"
            colorCode={colors.Gray800}
            onClick={() => handleResultClick(result.productId)}
          >
            <span>{highlightText(result.title)}</span>
          </ResultText>
        </ResultWrapper>
      ))}
    </Flex>
  ) : (
    <></>
  );
};

const IconWrapper = styled.div`
  width: 16px;
`;

const ResultWrapper = styled(Flex)`
  border-bottom: 1px solid ${colors.Gray200};
`;

const ResultText = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  line-height: 150%;
  cursor: pointer;
  &:hover {
    color: ${colors.Mint200};
  }
  align-items: flex-start;
`;

// 강조 표시 스타일 적용
const StyledMark = styled.mark`
  background: none;
  color: ${colors.Mint200};
  font-weight: bold;
  white-space: nowrap;
  line-height: 150%;
`;

const Wrapper = styled(Flex)`
  overflow-y: auto;
  overflow-x: hidden;
  flex-wrap: wrap;
  width: 100%;

  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const ProductWrapper = styled.div`
  /* width: calc(33.33% - 8px); */
  width: calc(50% - 35px);
  box-sizing: border-box;
`;

export default SearchResult;
