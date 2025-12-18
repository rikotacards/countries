import { useQuery } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

export const useCountriesVisited = () => {
  const queryFn = async () => {
    const {data, error} = await supabase.from("countriesVisited").select();
    if(error){
        throw error
    }
    return data
  };
  const q = useQuery({
    queryKey: ["countriesVisited"],
    queryFn
  });
  return q;
};
