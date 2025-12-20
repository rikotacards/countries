import { Box, IconButton, List, Typography } from "@mui/material";
import { AddCityDialog } from "./AddCityDialog";
import React from "react";
import { useCitiesVisited } from "../hooks/queries/useCitiesVisited";
import { CityRow } from "./CityRow";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { NoCities } from "./NoCities";
import { ListSkeleton } from "./ListSkeleton";
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
  if (visited.isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <ListSkeleton />
      </Box>
    );
  }
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
  const hasVisited = !!visited.data?.length;
  return (
    <Box>
      <Box
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Typography fontWeight={"bold"} variant="h4">
          
          {rows?.length}
        </Typography>
        <Typography variant='h6' color="textSecondary" fontWeight={"bold"} sx={{ ml: 1 }}>
          visited
        </Typography>
        <IconButton sx={{ ml: "auto" }} color="primary" onClick={onOpen}>
          <AddCircleRoundedIcon />
        </IconButton>
      </Box>
      {hasVisited && <List>{rows}</List>}
      {!hasVisited && <NoCities toggleOpen={onOpen} />}
      <AddCityDialog countryCode={countryCode} onClose={onClose} open={open} />
    </Box>
  );
};
