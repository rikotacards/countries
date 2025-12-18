import { Box, IconButton, List } from "@mui/material";
import { LocationRowLayout } from "./LocationRowLayout";
import { getEmojiFlag, type TCountryCode } from "countries-list";
import { CheckCircle } from "@mui/icons-material";
import { useAddLocation } from "../hooks/mutations/useAddLocation";
import { useCountriesVisited } from "../hooks/queries/useVisited";
import { useDeleteLocation } from "../hooks/mutations/useDeleteLocation";
import { countries } from "../countries";
interface CountryListProps {
  filter?: string;
}
export const CountryList: React.FC<CountryListProps> = ({ filter }) => {
  const visited = useCountriesVisited();
  const filteredList = countries.filter((c) =>
    !filter ? true : c.name.toLowerCase().includes(filter?.toLowerCase())
  );
  const add = useAddLocation();
  const remove = useDeleteLocation();
  const onAdd = async (countryCode: TCountryCode | false) => {
    add.mutateAsync(countryCode);
  };
  const onRemove = async (countryCode: TCountryCode | false) => {
    remove.mutateAsync(countryCode);
  };
  return (
    <List>
      {filteredList.map((c) => {
        const e = getEmojiFlag(c.country_code as TCountryCode);
        const hasVisited = visited.data?.find(
          (v) => v.country_code === c.country_code
        );
        const onClick = () => {
          if (hasVisited) {
            onRemove(c.country_code);
          } else {
            onAdd(c.country_code);
          }
        };
        return (
          <LocationRowLayout
            disableMore
            onClick={onClick}
            buttons={
              <Box>
                <IconButton>
                  <CheckCircle color={hasVisited ? "success" : undefined} />
                </IconButton>
              </Box>
            }
            key={c.name}
            flagImage={e}
            locationName={c.name}
          />
        );
      })}
    </List>
  );
};
