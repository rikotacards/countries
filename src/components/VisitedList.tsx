import { Box, List } from "@mui/material";
import { useVisited } from "../hooks/queries/useVisited";
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
  const visited = useVisited();
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
        onClick={() => onClick(r.countryCode)}
        flagImage={emoji}
        key={r.countryCode}
        locationName={countryObject.name}
      />
    );
  });
  return <List>{rows}</List>;
};
