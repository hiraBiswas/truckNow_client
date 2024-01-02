import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";

const useTruck = () => {
    const axiosPublic = useAxiosPublic();

    const { data: truck = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['truck'],
        queryFn: async () => {
            const res = await axiosPublic.get('/truck');
            return res.data;
        }
    });

    return { truck, loading, refetch };
}

export default useTruck;