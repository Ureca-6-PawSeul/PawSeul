import { getUserReviewDone, getUserReviewRemain } from "@/apis/review";
import { useQuery } from '@tanstack/react-query'

export const useGetReviewDone = () => {
    const {data} = useQuery({
        queryKey: ['getUserReviewDone'],
        queryFn: () => getUserReviewDone()
    })

    return data
};

export const useGetReviewRemain = () => {
    const {data} = useQuery({
        queryKey: ['getUserReviewRemain'],
        queryFn: () => getUserReviewRemain()
    })

    return data;
};