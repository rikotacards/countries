import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import { DateCalendar } from "@mui/x-date-pickers";
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
      <DialogTitle
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Typography variant="h5" fontWeight={"bold"}>
          When
        </Typography>
        <IconButton sx={{ ml: "auto" }} onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Typography sx={{ textAlign: "center" }} fontWeight={"bold"}>
            Start date
          </Typography>
          <DateCalendar
            disableHighlightToday
            value={start}
            onChange={(newValue) => onSetStart(newValue)}
            sx={{ mb: 1 }}
          />
          <Typography sx={{ textAlign: "center" }} fontWeight={"bold"}>
            End date
          </Typography>
          <DateCalendar
            disableHighlightToday
            sx={{ mb: 1 }}
            value={end}
            onChange={(newValue) => {
              onSetEnd(newValue);
            }}
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
