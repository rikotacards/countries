import { Add } from "@mui/icons-material";
import { Box, IconButton, List, Typography } from "@mui/material";
import React from "react";
import { DialogOrDrawer } from "../components/DialogOrDrawer";
import { AddTripForm } from "../components/AddTripForm";
import { useTrips } from "../hooks/queries/useTrips";
import { NoTrips } from "../components/NoTrips";
import { TripRow } from "../components/TripRow";
import type { ITrip } from "../hooks/mutations/useAddTrip";

export const TripsPage: React.FC = () => {
  const [selected, setSelected] = React.useState<ITrip | undefined>();
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
    if (open) {
      setSelected(undefined);
    }
  };
  const trips = useTrips();
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
        countryCode={t.countryCode}
        name={t.name}
      />
    );
  });
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
        <IconButton onClick={toggleOpen}>
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
