import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { DateField } from "@mui/x-date-pickers/DateField";
import {
  AppBar,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { PickerValue } from "@mui/x-date-pickers/internals";
interface Args {
  onClose: () => void;
  start?: PickerValue;
  end?: PickerValue;
  onSetStart: (v: PickerValue) => void;
  onSetEnd: (v: PickerValue) => void;
}
export const TripDatesForm: React.FC<Args> = ({
  start,
  end,
  onSetStart,
  onSetEnd,
  onClose,
}) => {
  const duration = end && start ? end.diff(start, "day") : null;
  return (
    <>
      <AppBar variant="outlined" position="relative">
        <Toolbar>
          <Typography fontWeight={"bold"}>When</Typography>
          <IconButton sx={{ ml: "auto" }} onClick={onClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            value={start}
            onChange={(newValue) => onSetStart(newValue)}
            sx={{ mb: 1 }}
            label="Start date"
          />
          <DateField
            sx={{ mb: 1 }}
            value={end}
            onChange={(newValue) => {
              onSetEnd(newValue);
            }}
            label="End date"
          />
        </LocalizationProvider>
        {!!duration && <Typography>{duration} days</Typography>}
      </DialogContent>
      <DialogActions>
        <Button fullWidth onClick={onClose} variant="contained">
          Add
        </Button>
      </DialogActions>
    </>
  );
};
