import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../utils/supabase";
import { useAuth } from "../../providers/contexts/authContext";
interface Args {
  geonameid: string;
  country_code: string;
}
export const useAddCity = () => {
  const client = useQueryClient();
  const auth = useAuth();

  return useMutation({
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["citiesVisited"] });
    },
    mutationFn: async (args: Args) => {
      return await supabase
        .from("citiesVisited")
        .insert({
          geonameid: args.geonameid,
          user_id: auth.user?.id,
          country_code: args.country_code,
        });
    },
  });
};
