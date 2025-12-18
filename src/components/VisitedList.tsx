import { Box, List } from "@mui/material";
import { useCountriesVisited } from "../hooks/queries/useVisited";
import { LocationRowLayout } from "./LocationRowLayout";
import {
  getCountryData,
  getEmojiFlag,
  type TCountryCode,
} from "countries-list";
import { NoCountries } from "./NoCountries";
import { ListSkeleton } from "./ListSkeleton";
interface VisitedListProps {
    toggleOpen: () => void;
    onClick: (code: TCountryCode) => void;
}
export const VisitedList: React.FC<VisitedListProps> = ({toggleOpen, onClick}) => {
  const visited = useCountriesVisited();
  if (visited.isLoading) {
    return <Box sx={{p:2}}>
      <ListSkeleton/>
      </Box>
  }
  if(!visited.data?.length){
    return <NoCountries toggleOpen={toggleOpen}/>
  }
  const rows = visited?.data?.map((r) => {
    const countryObject = getCountryData(r.country_code);
    const emoji = getEmojiFlag(r.country_code);
    return (
      <LocationRowLayout
        onClick={() => onClick(r.country_code)}
        flagImage={emoji}
        key={r.country_code}
        locationName={countryObject.name}
      />
    );
  });
  return <List>{rows}</List>;
};
