import { getUserReviewDone, getUserReviewRemain } from "@/apis/review";
import { useQuery } from '@tanstack/react-query'

export const useGetReviewDone = () => {
    const {data} = useQuery({
        queryKey: ['getUserReviewDone'],
        queryFn: () => getUserReviewDone(),
        staleTime : 1000 * 60 * 5,
    })
    return data
};

export const useGetReviewRemain = () => {
    const {data} = useQuery({
        queryKey: ['getUserReviewRemain'],
        queryFn: () => getUserReviewRemain(),
        staleTime : 1000 * 60 * 5,
    })
    console.log(data)

    return data;
};