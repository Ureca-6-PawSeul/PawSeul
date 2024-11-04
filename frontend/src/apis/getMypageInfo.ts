import client from './client';

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzNzc2Njg0MzIwIiwiZW1haWwiOiJja3NxdWY5OEBuYXZlci5jb20iLCJ1c2VybmFtZSI6Iuq5gOywrOuzhCIsImlhdCI6MTczMDYyMDc1NiwiZXhwIjoxNzMwNjYzOTU2fQ.29YOSLJHE8yvDcfzjLxpSi4M6Tpyumo3CfaFKV2IQp0"
export const getMypageInfo = async (setPetInfo) => {
  try {
    const { data } = await client.get(`/user/me/pet`, {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰 추가
      },
    });
    setPetInfo(data);
    console.log(data);
  } catch (error) {
    console.error('Error fetching mypage info:', error);
  }
};
