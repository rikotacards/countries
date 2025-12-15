import { Box, List } from "@mui/material";
import { useVisited } from "../hooks/queries/useVisited";
import { LocationRowLayout } from "./LocationRowLayout";
import {
  getCountryData,
  getEmojiFlag,
  type TCountryCode,
} from "countries-list";
import { useNavigate } from "react-router";
import { NoCountries } from "./NoCountries";
import { ListSkeleton } from "./ListSkeleton";
interface VisitedListProps {
    toggleOpen: () => void;
}
export const VisitedList: React.FC<VisitedListProps> = ({toggleOpen}) => {
  const visited = useVisited();
  const nav = useNavigate();
  const goToLocation = (countryCode: TCountryCode | false) => {
    nav(`/country/${countryCode}`);
  };
  if (visited.isLoading) {
    return <Box sx={{p:2}}>
      <ListSkeleton/>
      </Box>
  }
  if(!visited.data?.length){
    return <NoCountries toggleOpen={toggleOpen}/>
  }
  const rows = visited?.data?.map((r) => {
    const countryObject = getCountryData(r.countryCode);
    const emoji = getEmojiFlag(r.countryCode);
    return (
      <LocationRowLayout
        onClick={() => goToLocation(r.countryCode)}
        flagImage={emoji}
        key={r.countryCode}
        locationName={countryObject.name}
      />
    );
  });
  return <List>{rows}</List>;
};
