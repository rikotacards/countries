import { useQuery } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

export const useCitiesVisited = () => {
  return (country_code: string) =>
    useQuery({
      queryKey: ["citiesVisited", country_code],
      queryFn: async () => {
        const { data, error } = await supabase
          .from("citiesVisited")
          .select(
            `
            id, 
            cities ( 
              name,
              geonameid,
              country_code
            )
          `
          )
          .eq("cities.country_code", country_code);
        if (error) {
          throw error;
        }
        const res = [] as {
          name: any;
          geonameid: any;
          country_code: any;
        }[];
        data.forEach((item) => {
          if (item.cities) {
            res.push({
              name: item.cities?.name,
              geonameid: item.cities?.geonameid,
              country_code: item.cities?.country_code,
            });
          }
        });
        return res;
      },
    });
};
