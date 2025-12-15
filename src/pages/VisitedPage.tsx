import { Box, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { AddCountryDialog } from "../components/AddCountryDialog";
import { Add } from "@mui/icons-material";
import { VisitedList } from "../components/VisitedList";

export const VisitedPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    setOpen(false);
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
      <Stack direction={"row"} sx={{ alignItems: "center" }}>
        <Typography sx={{ p: 2 }} fontWeight={"bold"} variant="h5">
          Visited Countries
        </Typography>
        <IconButton onClick={onOpen}>
          <Add />
        </IconButton>
      </Stack>
      <VisitedList toggleOpen={onOpen} />
      <Box
        sx={{
          display: "flex",
          position: "fixed",
          flexDirection: "column",
          bottom: 50,
          m: 2,
          right: 0,
        }}
      >
      </Box>
      <AddCountryDialog onClose={onClose} open={open} />
    </Box>
  );
};
