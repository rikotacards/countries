import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import {
  Box,
  Button,
  Collapse,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import { DateCalendar } from "@mui/x-date-pickers";
import { FormInput } from "./FormInput";
import { formatOptions } from "../utils/dateFormat";
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
  const startDate = start
    ? new Date(start?.toDate())?.toLocaleDateString("en-GB", formatOptions)
    : "";
  const endDate = end
    ? new Date(end?.toDate())?.toLocaleDateString("en-GB", formatOptions)
    : "";
  const [dialogName, setDialogName] = React.useState("start");
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
        <FormInput
          onClick={() => {
            setDialogName("start");
          }}
          label="Add Start"
          value={startDate}
        >
          <Collapse in={dialogName === "start"}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                disableHighlightToday
                value={start}
                onChange={(newValue) => {
                  onSetStart(newValue);
                  setDialogName("end");
                }}
              />
            </LocalizationProvider>
          </Collapse>
        </FormInput>
        <Box sx={{ mt: 1 }}>
          <FormInput
            onClick={() => {
              setDialogName("end");
            }}
            label="Add end"
            value={endDate}
          >
            <Collapse in={dialogName === "end"}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  disableHighlightToday
                  sx={{ mb: 1 }}
                  value={end}
                  onChange={(newValue) => {
                    onSetEnd(newValue);
                    setDialogName("");
                  }}
                />
              </LocalizationProvider>
            </Collapse>
          </FormInput>
        </Box>

        {!!duration && (
          <Typography fontWeight={"bold"} sx={{ textAlign: "center" }}>
            {duration} days
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button sx={{ m: 2 }} fullWidth onClick={onClose} variant="contained">
          Done
        </Button>
      </DialogActions>
    </>
  );
};
