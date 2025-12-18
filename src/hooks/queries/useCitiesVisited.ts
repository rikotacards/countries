import { useQuery } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

export const useCitiesVisited = () => {
  return (country_code: string) =>
    useQuery({
      queryKey: ["citiesVisited", country_code],
      queryFn: async () => {
        let q = supabase.from("citiesVisited").select(
          `
            id, 
            cities ( 
              name,
              geonameid,
              country_code
            )
          `
        );
        if (country_code) {
          q = q.eq("country_code", country_code);
        }
        const { data, error } = await q
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
              //@ts-ignore
              name: item.cities?.name,
              //@ts-ignore
              geonameid: item.cities?.geonameid,
              //@ts-ignore
              country_code: item.cities?.country_code,
            });
          }
        });
        return res;
      },
    });
};
