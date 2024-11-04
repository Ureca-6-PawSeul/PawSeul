import client from './client'

export const getUserReviewDone = async (setUserReviewList) => {
    const {data} = await client.get('/api/v1/mypage/reviewDone')
    setUserReviewList(data)
    console.log(data)
}