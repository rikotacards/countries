import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../utils/supabase";
import type { TCountryCode } from "countries-list";
export interface ITrip {
    countryCode: TCountryCode;
    start_date: string;
    end_date: string;
    notes?: string;
    vehicle?: string;
    geonameid?: string;
    name: string;
    id?: string;
}
export const useAddTrip = () => {
  const client = useQueryClient();
  return useMutation({
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["trips"] });
    },
    mutationFn: async (args: ITrip) => {
      return await supabase
        .from("trips")
        .insert(args);
    },
  });
};
