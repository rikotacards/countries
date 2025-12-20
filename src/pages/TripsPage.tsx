import { Add } from "@mui/icons-material";
import { Box, IconButton, List, Typography } from "@mui/material";
import React from "react";
import { DialogOrDrawer } from "../components/DialogOrDrawer";
import { AddTripForm } from "../components/AddTripForm";
import { useTrips } from "../hooks/queries/useTrips";
import { NoTrips } from "../components/NoTrips";
import { TripRow } from "../components/TripRow";
import type { ITrip } from "../hooks/mutations/useAddTrip";
import { ListSkeleton } from "../components/ListSkeleton";
import type { TCountryCode } from "countries-list";
interface TripsPageProps {
  countryCode?: TCountryCode;
}
export const TripsPage: React.FC<TripsPageProps> = ({ countryCode }) => {
  const [selected, setSelected] = React.useState<ITrip | undefined>();
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
    if (open) {
      setSelected(undefined);
    }
  };
  const trips = useTrips(countryCode);
  const onRowClick = (arg: ITrip) => {
    toggleOpen();
    setSelected(arg);
  };
  const rows = trips.data?.map((t, i) => {
    return (
      <TripRow
        onClick={() => {
          onRowClick(t);
        }}
        start={t.start_date}
        end={t.end_date}
        key={i}
        countryCode={t.country_code}
        name={t.name}
      />
    );
  });
  if (trips.isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <ListSkeleton />
      </Box>
    );
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          pt: 2,
        }}
      >
        <Typography variant="h5" fontWeight={"bold"} pl={2}>
          Trips
        </Typography>
        <IconButton
          color="primary"
          sx={{ ml: "auto", mr: 2 }}
          onClick={toggleOpen}
        >
          <Add />
        </IconButton>
      </Box>

      {rows?.length ? <List>{rows}</List> : <NoTrips toggleOpen={toggleOpen} />}
      <DialogOrDrawer open={open} onClose={toggleOpen}>
        <AddTripForm formData={selected} onClose={toggleOpen} />
      </DialogOrDrawer>
    </Box>
  );
};
