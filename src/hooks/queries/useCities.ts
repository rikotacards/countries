import { useQuery } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

// ⚠️ Note: I'm changing the type of country_code to string | undefined
export const useGetCities = () => {
  return (country_code: string | undefined, name: string) =>
    useQuery({
      // ⚠️ IMPORTANT: The queryKey must include all variables that affect the data,
      // including the country_code.
      queryKey: ["cities", name, country_code],
      enabled: name.length >= 2,
      queryFn: async () => {
        // 1. Start the query builder chain
        let query = supabase.from("cities").select();

        // 2. Conditionally apply the .eq() filter
        if (country_code) {
          query = query.eq("country_code", country_code);
        }

        // 3. Apply the remaining mandatory filters/orders
        const { data, error } = await query
          .ilike("name", `${name}%`)
          .order("country_code")

        if (error) {
          throw error;
        }
        return data;
      },
    });
};
