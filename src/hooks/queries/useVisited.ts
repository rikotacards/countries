import { useQuery } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

export const useVisited = () => {
  const queryFn = async () => {
    const {data, error} = await supabase.from("visited").select();
    if(error){
        throw error
    }
    return data
  };
  const q = useQuery({
    queryKey: ["visited"],
    queryFn
  });
  return q;
};
