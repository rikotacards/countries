import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

export const useAddCity = () => {
  const client = useQueryClient();
  return useMutation({
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["citiesVisited"] });
    },
    mutationFn: async (geonameid: string) => {
      return await supabase
        .from("citiesVisited")
        .insert({ geonameid });
    },
  });
};
