import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { DialogOrDrawer } from "./DialogOrDrawer";
import { DestinationForm } from "./DestinationFrom";
import { TripDatesForm } from "./TripDatesForm";
import { FormInput } from "./FormInput";
import { Close } from "@mui/icons-material";
import { useTripForm } from "../hooks/useTripForm";
import { getCountryData, type TCountryCode } from "countries-list";
import type { ITrip } from "../hooks/mutations/useAddTrip";
import { formatOptions } from "../utils/dateFormat";
import { useDeleteTrip } from "../hooks/mutations/useDeleteTrip";
interface Arg {
  onClose: () => void;
  formData?: ITrip;
}

export const AddTripForm: React.FC<Arg> = ({ formData, onClose }) => {
  const [form, setForm] = React.useState("");
  const {
    onSetEnd,
    onSetStart,
    location,
    onSetLocation,
    start,
    end,
    onSubmit,
    onNoteChange,
    notes,
  } = useTripForm(formData);
  const countryData = getCountryData(location.countryCode as TCountryCode);
  const { name: countryName } = countryData;
  const close = () => {
    setForm("");
  };
  const onOpenDestination = () => {
    setForm("destination");
  };
  const onOpenWhen = () => {
    setForm("dates");
  };
  const submit = async () => {
    await onSubmit();
    onClose();
  };
  const deleteTrip = useDeleteTrip();
  const onDelete = async(id?: string) => {
    if(!id){
        console.error('No id')
        return
    }
    await deleteTrip.mutateAsync(id);
    onClose()
  }
  const locationValue =
    location && countryName ? `${location.name}` + `, ${countryName}` : "";
  const hasValidDates = start && end;
  const title = formData ? "Trip Details" : "Add Trip";
  const actionLabel = formData ? "Update" : "Add Trip";
  console.log("start", start);
  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <DialogTitle
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <IconButton sx={{ ml: "auto" }} onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ flexGrow: 1 }}>
        <FormInput
          label={"Where"}
          onClick={onOpenDestination}
          value={locationValue}
        />
        <FormInput
          label={"When"}
          value={
            hasValidDates
              ? `${new Date(start.toDate())?.toLocaleDateString(
                  "en-GB",
                  formatOptions
                )} - ${new Date(end.toDate())?.toLocaleDateString(
                  "en-GB",
                  formatOptions
                )}`
              : ""
          }
          onClick={onOpenWhen}
        />
        <Typography sx={{ mt: 1, mb: 1 }}>Notes</Typography>
        <TextField
          value={notes}
          onChange={onNoteChange}
          fullWidth
          placeholder="Add notes or highlights"
        />
        <DialogOrDrawer onClose={close} open={form === "destination"}>
          <DestinationForm
            location={location}
            onSetLocation={onSetLocation}
            onClose={close}
          />
        </DialogOrDrawer>
        <DialogOrDrawer open={form === "dates"} onClose={close}>
          <TripDatesForm
            start={start}
            end={end}
            onSetStart={onSetStart}
            onSetEnd={onSetEnd}
            onClose={close}
          />
        </DialogOrDrawer>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <Button
            sx={{ m: 1 }}
            onClick={submit}
            size="large"
            variant="contained"
          >
            {actionLabel}
          </Button>
          {formData && <Button
          onClick={() => onDelete(formData.id)}
          sx={{ m: 1 }} size="large" variant="outlined">
            Delete
          </Button>}
          <Button
            onClick={onClose}
            sx={{ m: 1 }}
            size="large"
            variant="text"
            fullWidth
          >
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Box>
  );
};
