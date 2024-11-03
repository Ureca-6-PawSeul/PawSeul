import {create} from 'zustand';

interface SearchStore {
  //검색한 문자열
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  //검색 후 받은 결과(제품들) 배열 -> 제품 이름으로 검색
  searchResults: string[];
  setSearchResults: (results: string[]) => void;
  //검색 결과 삭제
  clearSearchResults: () => void;
  //최근 검색어 배열
  recentSearchQueries: string[];
  addRecentSearchQuery: (query: string) => void;
  //최근 검색어 배열 삭제
  clearRecentSearchQueries: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
  clearSearchResults: () => set({ searchResults: [] }),
  recentSearchQueries: [],
  addRecentSearchQuery: (searchQuery) =>
    set((state) => ({
      recentSearchQueries: [
        ...new Set([searchQuery, ...state.recentSearchQueries]),
      ].slice(0, 20),
    })),
  clearRecentSearchQueries: () => set({ recentSearchQueries: [] }),
}));
