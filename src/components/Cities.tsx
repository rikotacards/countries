import { Box, IconButton, List, Typography } from "@mui/material";
import { AddCityDialog } from "./AddCityDialog";
import React from "react";
import { useCitiesVisited } from "../hooks/queries/useCitiesVisited";
import { CityRow } from "./CityRow";
import { Add } from "@mui/icons-material";
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
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography fontWeight={'bold'} variant="body1">Visited Cities: {rows?.length}</Typography>
        <IconButton color="primary" onClick={onOpen}><Add/></IconButton>
      </Box>
      <List>{rows}</List>
      <AddCityDialog countryCode={countryCode} onClose={onClose} open={open} />
    </Box>
  );
};
