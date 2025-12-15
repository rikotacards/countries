import { Box, List, Skeleton } from "@mui/material";
import { useGetCities } from "../hooks/queries/useCities";
import React from "react";
import { CityRow } from "./CityRow";
interface CityListProps {
  countryCode: string;
  filter?: string;
}
export const CityList: React.FC<CityListProps> = React.memo(
  ({ countryCode, filter }) => {
    const getCities = useGetCities();
    const cities = getCities(countryCode, filter || "");

    const rows = cities.data?.map((city) => {
      return (
        <CityRow
          key={city.geonameid}
          locationName={city.name}
          geonameid={city.geonameid}
          countryCode={countryCode}
        />
      );
    });
    if ( cities.isLoading || cities.isLoading) {
      return (
        <Box sx={{ m: 2, display: "flex", flexDirection: "column" }}>
          <Skeleton height={"40px"} variant="text" />
          <Skeleton height={"40px"} variant="text" />
          <Skeleton height={"40px"} variant="text" />
        </Box>
      );
    }
    return <List>{rows}</List>;
  }
);
