import client from './client'

export const getUserReviewDone = async () => {
    const {data} = await client.get('review/me', {
        withCredentials: true,
    })

    return data.reviews;
}


export const getUserReviewRemain = async () => {
    const {data} = await client.get('order/unreviewed', {
        withCredentials: true,
    })
    return data.reviews;
  };
