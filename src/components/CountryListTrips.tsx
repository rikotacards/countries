import { Box, List } from "@mui/material";
import { getEmojiFlag } from "countries-list";
import { LocationCity } from "@mui/icons-material";
import { LocationRowLayout } from "./LocationRowLayout";
import React from "react";
import type { LocationProps } from "../hooks/useTripForm";
import { countries } from "../countries";

interface CountryAndCityListProps {
  filter?: string;
  onClick: (args: LocationProps) => void;
  onClose: () => void;
}
export const CountryListTrips: React.FC<CountryAndCityListProps> = React.memo(
  ({ filter, onClick, onClose }) => {
    const filteredCountries = countries.filter((c) =>
      !filter ? true : c.name.toLowerCase().includes(filter?.toLowerCase())
    );
    const filteredCountriesList = filteredCountries.map((country) => {
      return {
        name: country.name,
        countryCode: country.country_code,
        countryName: country.name,
      };
    });

    // const cities = getCities(undefined, filter || "");
    // const filteredCitiesList = cities.data?.map((city) => {
    //   const o = getCountryData(city.country_code as TCountryCode);
    //   return {
    //     name: city.name,
    //     countryCode: city.country_code,
    //     countryName: o.name,
    //   };
    // });
    const all = [
      // ...(filteredCitiesList || []),
      ...filteredCountriesList,
    ];
    const rows = all.map((d, i) => {
      const e = getEmojiFlag(d.countryCode);
      return (
        <LocationRowLayout
          onClick={() => {
            onClick({ country_code: d.countryCode, name: d.name });
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

    return (
      <Box>
        <List>{rows}</List>
      </Box>
    );
  }
);
