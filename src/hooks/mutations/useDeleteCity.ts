import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

export const useDeleteCity = () => {
  const client = useQueryClient();
  return useMutation({
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['citiesVisited']});
    },
    mutationFn: async (geonameid:  string) => {
      await supabase.from("citiesVisited").delete().eq("geonameid", geonameid);
    },
  });
};
