import { useQuery } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

export const useTrips = () => {
  const queryFn = async () => {
    const {data, error} = await supabase.from("trips").select().order('start_date', {ascending: true})
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
