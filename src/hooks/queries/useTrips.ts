import { useQuery } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

export const useTrips = () => {
  const queryFn = async () => {
    const {data, error} = await supabase.from("trips").select().order('created_at', {ascending: false})
    if(error){
        throw error
    }
    return data
  };
  const q = useQuery({
    queryKey: ["trips"],
    queryFn
  });
  return q;
};
