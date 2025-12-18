import { Box, IconButton, List, Typography } from "@mui/material";
import { AddCityDialog } from "./AddCityDialog";
import React from "react";
import { useCitiesVisited } from "../hooks/queries/useCitiesVisited";
import { CityRow } from "./CityRow";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
interface CitiesProps {
  countryCode: string;
}
export const Cities: React.FC<CitiesProps> = ({ countryCode }) => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const onOpen = () => {
    setOpen(true);
  };
  const getVisited = useCitiesVisited();
  const visited = getVisited(countryCode);
  const rows = visited.data?.map((v) => {
    if (!v?.name) {
      return undefined;
    }
    return (
      <CityRow
        countryCode={countryCode}
        key={v.geonameid}
        geonameid={v.geonameid}
        locationName={v?.name || ""}
      />
    );
  });
  return (
    <Box>
      <Box sx={{p:2, display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="body1">Visited Cities: {rows?.length}</Typography>
        <IconButton sx={{ml:'auto'}} color="primary" onClick={onOpen}><AddCircleRoundedIcon/></IconButton>
      </Box>
      <List>{rows}</List>
      <AddCityDialog countryCode={countryCode} onClose={onClose} open={open} />
    </Box>
  );
};
