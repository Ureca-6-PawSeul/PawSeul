import client from './client';

export const getSearchList = async (searchQuery: string) => {
  const response = await client.get(`/api/search?query=${searchQuery}`);
  //dataArray가 title 속성을 가진 객체 배열임을 명시
  const dataArray = Object.values(response.data) as { title: string }[];
  //각 객체의 title 문자열 속성만 추출하여 문자열 배열로 변환
  const titleArray = dataArray.map(item => item.title);
  return titleArray;
}
