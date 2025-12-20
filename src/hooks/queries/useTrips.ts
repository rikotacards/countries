import { useQuery } from "@tanstack/react-query";
import supabase from "../../utils/supabase";
import type { TCountryCode } from "countries-list";

export const useTrips = (countryCode?: TCountryCode) => {
  const queryFn = async () => {
    let q = supabase
      .from("trips")
      .select()
      .order("start_date", { ascending: true });

    if (countryCode) {
      q.eq("country_code", countryCode);
    }
    const { data, error } = await q;
    if (error) {
      throw error;
    }
    return data;
  };
  const q = useQuery({
    queryKey: ["trips", countryCode],
    queryFn,
  });
  return q;
};
