import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { AddCountryDialog } from "../components/AddCountryDialog";
import { Add } from "@mui/icons-material";
import { VisitedList } from "../components/VisitedList";
import { DialogOrDrawer } from "../components/DialogOrDrawer";
import { LocationPage } from "./LocationPage";
import type { TCountryCode } from "countries-list";
import { useVisited } from "../hooks/queries/useVisited";

export const VisitedPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const visitCount = useVisited().data?.length || 0;

  const [select, setSelect] = React.useState<TCountryCode | undefined>();
  const onSelect = (code: TCountryCode) => {
    setSelect(code);
  };
  const onClose = () => {
    setOpen(false);
    setSelect(undefined);
  };
  const onOpen = () => {
    setOpen(true);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack
        direction={"row"}
        sx={{ alignItems: "center", pt: 2, pl: 2, pr: 2 }}
      >
        <Typography sx={{}} fontWeight={"bold"} variant="h5">
          Visited Countries ({visitCount})
        </Typography>
        <IconButton sx={{ ml: "auto", mr:0 }} onClick={onOpen}>
          <Add color="primary" />
        </IconButton>
      </Stack>
      <VisitedList onClick={onSelect} toggleOpen={onOpen} />

      <AddCountryDialog onClose={onClose} open={open} />
      <DialogOrDrawer open={!!select} onClose={onClose}>
        <LocationPage onClose={onClose} countryCode={select} />
      </DialogOrDrawer>
    </Box>
  );
};
