import { Box, List } from "@mui/material";
import { getEmojiFlag } from "countries-list";
import { LocationCity } from "@mui/icons-material";
import { LocationRowLayout } from "./LocationRowLayout";
import React from "react";
import type { LocationProps } from "../hooks/useTripForm";
import { countries } from "../countries";
import { useGetCities } from "../hooks/queries/useCities";
import { ListSkeleton } from "./ListSkeleton";

interface CountryAndCityListProps {
  filter?: string;
  onClick: (args: LocationProps) => void;
  onClose: () => void;
}
export const CityListTrips: React.FC<CountryAndCityListProps> = React.memo(
  ({ filter, onClick, onClose }) => {
    const getCities = useGetCities();

    const cities = getCities(undefined, filter || "");
    const isLoading = cities.isLoading;
    const filteredCitiesList = cities.data?.map((city) => {
      const o = countries.find((c) => c.country_code === city.country_code);
      return {
        name: city.name,
        countryCode: city.country_code,
        countryName: o?.name,
        geonameId: city.geonameid
      };
    });
    const all = filteredCitiesList || []
    const rows = all.map((d, i) => {
      const e = getEmojiFlag(d.countryCode);
      return (
        <LocationRowLayout
          onClick={() => {
            onClick({isCity: true, country_code: d.countryCode, name: d.name, geonameid: d.geonameId });
            onClose();
          }}
          flagImage={e}
          icon={!e && <LocationCity />}
          key={`${d.countryCode}+${d.name}+${i}`}
          locationName={d.name}
          secondaryText={d.countryName}
        />
      );
    });
    if (isLoading) {
      return (
        <Box sx={{ p: 2 }}>
          <ListSkeleton />
        </Box>
      );
    }
    return (
      <Box>
        <List>{rows}</List>
      </Box>
    );
  }
);
