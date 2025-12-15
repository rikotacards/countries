import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../utils/supabase";
import type { TCountryCode } from "countries-list";
import { useAuth } from "../../providers/contexts/authContext";

export const useAddLocation = () => {
  const client = useQueryClient();
  const auth = useAuth();
  return useMutation({
    mutationKey: ["visited"],
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["visited"] });
    },
    mutationFn: async (countryCode: TCountryCode | false) => {
      return await supabase
        .from("visited")
        .insert({ countryCode, user_id: auth.user?.id });
    },
  });
};
