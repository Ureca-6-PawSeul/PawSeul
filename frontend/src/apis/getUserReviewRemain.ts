import client from "./client";

export const getUserReviewRemain = async (setUserReviewList) => {
    try {
      const { data } = await client.get('/api/v1/mypage/reviewRemain');
      setUserReviewList(data);
      console.log(data); // 성공 시 출력
    } catch (error) {
      console.error('Error fetching data:', error); // 에러 발생 시 출력
    }
  };
  