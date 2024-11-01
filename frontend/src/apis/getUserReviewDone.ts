import client from './client'

export const getUserReviewDone = async (setUserReviewList) => {
    const {data} = await client.get('/api/mypage/reviewDone')
    setUserReviewList(data)
    console.log(data)
}