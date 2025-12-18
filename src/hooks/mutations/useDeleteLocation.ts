import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../utils/supabase";
import type { TCountryCode } from "countries-list";

export const useDeleteLocation = () => {
  const client = useQueryClient();
  return useMutation({
    onSuccess: () => {
      client.invalidateQueries({queryKey: ["countriesVisited"]});
    },
    mutationFn: async (countryCode: TCountryCode | false) => {
      await supabase.from("countriesVisited").delete().eq("country_code", countryCode);
    },
  });
};
