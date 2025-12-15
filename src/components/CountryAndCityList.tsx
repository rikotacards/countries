import { Box, List } from "@mui/material";
import {
  countries,
  getCountryCode,
  getCountryData,
  getEmojiFlag,
  type TCountryCode,
} from "countries-list";
import { useGetCities } from "../hooks/queries/useCities";
import { LocationCity } from "@mui/icons-material";
import { LocationRowLayout } from "./LocationRowLayout";
import React from "react";
import type { LocationProps } from "../hooks/useTripForm";

interface CountryAndCityListProps {
  filter?: string;
  onClick: (args: LocationProps) => void;
  onClose: () => void;
}
export const CountryAndCityList: React.FC<CountryAndCityListProps> = React.memo(
  ({ filter, onClick, onClose }) => {
    const getCities = useGetCities();

    const countriesList = Object.values(countries).map((country) => ({
      ...country,
    }));
    const filteredCountries = countriesList.filter((c) =>
      !filter ? true : c.name.toLowerCase().includes(filter?.toLowerCase())
    );
    const filteredCountriesList = filteredCountries.map((country) => {
      const countryCode = getCountryCode(country.name);
      const object = getCountryData(countryCode as TCountryCode);
      return {
        name: country.name,
        countryCode: object.iso2,
        countryName: object.name,
      };
    });

    const cities = getCities(undefined, filter || "");
    const filteredCitiesList = cities.data?.map((city) => {
      const o = getCountryData(city.country_code as TCountryCode);
      return {
        name: city.name,
        countryCode: city.country_code,
        countryName: o.name,
      };
    });
    const all = [...(filteredCitiesList || []), ...filteredCountriesList];
    const rows = all.map((d, i) => {
      const e = getEmojiFlag(d.countryCode);
      return (
        <LocationRowLayout
          onClick={() => {
            onClick({ countryCode: d.countryCode, name: d.name });
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
