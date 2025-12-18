import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../utils/supabase";
import type { TCountryCode } from "countries-list";
import { useAuth } from "../../providers/contexts/authContext";

export const useAddLocation = () => {
  const client = useQueryClient();
  const auth = useAuth();
  return useMutation({
    mutationKey: ["countriesVisited"],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["countriesVisited"] });
    },
    mutationFn: async (countryCode: TCountryCode | false) => {
      return await supabase
        .from("countriesVisited")
        .insert({ country_code: countryCode, user_id: auth.user?.id });
    },
  });
};
