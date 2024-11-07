import styled from '@emotion/styled';
import { Flex } from '@components/common/Flex';
import { colors } from '@styles/colors';
import { IoArrowBack, IoSearch } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';
import { getSearchList } from '@/apis/getSearchList';
import SearchResult from '@/components/search/SearchResult';
import RecentSearchResult from '@/components/search/RecentSearchResult';
import { useState, useEffect, useCallback } from 'react';
import { ProductType } from '@/assets/types/ProductType';
import { debounce } from 'lodash';
import { IoIosArrowRoundBack, IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  // 현재 검색어
  const [searchQuery, setSearchQuery] = useState('');
  // 검색 결과
  const [searchResults, setSearchResults] = useState<ProductType[]>([]);
  // 최근 검색어
  const [recentSearchQueries, setRecentSearchQueries] = useState<string[]>([]);

  const [isSearchComplete, setIsSearchComplete] = useState(false);
  const navigate = useNavigate();

  // 마운트 시 세션 스토리지에서 최근 검색어 목록 불러오기
  useEffect(() => {
    const recentSearchQueries =
      JSON.parse(sessionStorage.getItem('recentSearchQueries')) || [];
    setRecentSearchQueries(recentSearchQueries);
  }, []);

  // 세션 스토리지에 최근 검색어 목록 저장
  const saveToSessionStorage = (searchQueries) => {
    sessionStorage.setItem(
      'recentSearchQueries',
      JSON.stringify(searchQueries),
    );
  };

  const handleSearchButtonClick = () => {
    if (searchQuery) {
      handleSearch(searchQuery);
      //search 버튼을 누르거나, 엔터를 통해 검색하면 최근 검색어에 저징됨
      // 중복 제거 후 최근 검색어 목록에 추가
      addRecentSearchQuery(searchQuery);
      setIsSearchComplete(true);
    }
  };

  const handleSearch = async (query) => {
    const data = await getSearchList(query.toLowerCase());
    setSearchResults(data ?? []);
  };

  const addRecentSearchQuery = (searchQuery: string) => {
    setRecentSearchQueries((prevQueries) =>
      [...new Set([searchQuery, ...prevQueries])].slice(0, 20),
    );
    // 중복 제거한 최근 검색어 목록을 세션 스토리지에 저장
    saveToSessionStorage(recentSearchQueries);
  };

  // useCallBack을 통해 debounce를 처리
  const debouncedSearch = useCallback(
    debounce((query) => {
      handleSearch(query);
    }, 150),
    [], //랜더링 시 매번 새로운 함수가 생성되는 것을 방지
  );

  const handleBackClick = () => {
    navigate(-1); //
  };

  useEffect(() => {
    if (searchQuery) {
      setIsSearchComplete(false); //검색어 입력 중에는 검색 완료 상태를 false로 변경
      debouncedSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  return (
    <Flex direction="column" justify="flex-start">
      <SearchWrapper
        justify="space-between"
        padding="12px 24px 12px 12px"
        height="fit-content"
        gap={12}
      >
        <BackWrapper onClick={handleBackClick}>
          <IoIosArrowBack size={24} />
        </BackWrapper>
        <InputWrapper
          padding="6px 6px 6px 12px "
          backgroundColor={colors.White}
          justify="space-between"
          height={40}
        >
          <Input
            type="text"
            placeholder="검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              //엔터 입력 시 현재 검색어가 최근 검색어에 추가됨
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearchButtonClick();
              }
            }}
          />
          {searchQuery && (
            <EraseButton onClick={() => setSearchQuery('')} width="fit-content">
              <TiDelete size={26} color={colors.Gray300} />
            </EraseButton>
          )}
        </InputWrapper>
      </SearchWrapper>
      {searchQuery ? (
        <SearchResult
          searchResults={searchResults}
          searchQuery={searchQuery}
          isSearchComplete={isSearchComplete}
        />
      ) : (
        <RecentSearchResult
          recentSearchQueries={recentSearchQueries}
          setRecentSearchQueries={setRecentSearchQueries}
          setSearchQuery={setSearchQuery}
        />
      )}
    </Flex>
  );
};

const SearchWrapper = styled(Flex)`
  border-bottom: 1px solid ${colors.Gray100};
`;

const InputWrapper = styled(Flex)`
  border-radius: 52px;
  backdrop-filter: blur(8px);
  border: 1px solid ${colors.Gray600};
`;

const InputButton = styled.button`
  border: none;
  background-color: transparent;
`;

const BackWrapper = styled.button`
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  /* padding: 8px 12px 8px 6px; */
  background: none;
  resize: none;
  border: none;
  width: 100%;
  font-size: 14px;
  font-weight: 400;
  line-height: 23px;
`;

const EraseButton = styled(Flex)`
  cursor: pointer;
`;

export default Search;
