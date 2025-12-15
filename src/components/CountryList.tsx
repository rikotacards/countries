import { Box, IconButton, List } from "@mui/material";
import { LocationRowLayout } from "./LocationRowLayout";
import { countries, getCountryCode, getEmojiFlag, type TCountryCode } from "countries-list";
import { CheckCircle } from "@mui/icons-material";
import { useAddLocation } from "../hooks/mutations/useAddLocation";
import { useVisited } from "../hooks/queries/useVisited";
import { useDeleteLocation } from "../hooks/mutations/useDeleteLocation";
interface CountryListProps {
  filter?: string;
}
export const CountryList: React.FC<CountryListProps> = ({filter}) => {
  const visited = useVisited();
  const list = Object.values(countries).map((country) => country);
  const filteredList = list.filter((c) => !filter ? true : c.name.toLowerCase().includes(filter?.toLowerCase()))
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
        const countryCode = getCountryCode(c.name)
        const e = getEmojiFlag(countryCode as TCountryCode)
        const hasVisited = visited.data?.find(
          (v) => v.countryCode === countryCode
        );
        return (
          <LocationRowLayout
            buttons={
              <Box>
                <IconButton
                  onClick={() => {
                    if (hasVisited) {
                      onRemove(countryCode);
                    } else {
                      onAdd(countryCode);
                    }
                  }}
                >
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
