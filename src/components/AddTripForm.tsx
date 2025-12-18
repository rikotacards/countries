import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { DialogOrDrawer } from "./DialogOrDrawer";
import { WhereForm } from "./WhereForm";
import { TripDatesForm } from "./TripDatesForm";
import { FormInput } from "./FormInput";
import { Close } from "@mui/icons-material";
import { useTripForm } from "../hooks/useTripForm";
import { getCountryData, type TCountryCode } from "countries-list";
import { useAddTrip, type ITrip } from "../hooks/mutations/useAddTrip";
import { formatOptions } from "../utils/dateFormat";
import { useDeleteTrip } from "../hooks/mutations/useDeleteTrip";
import { useAddLocation } from "../hooks/mutations/useAddLocation";
import { useAddCity } from "../hooks/mutations/useAddCity";
import { useUpdateTrip } from "../hooks/mutations/useUpdateTrip";
interface Arg {
  onClose: () => void;
  formData?: ITrip;
}
const vehicles = ["Plane", "Car", "Boat"];
export const AddTripForm: React.FC<Arg> = ({ formData, onClose }) => {
  const [form, setForm] = React.useState("");
  const {
    onSetEnd,
    onSetStart,
    location,
    onSetLocation,
    start,
    end,
    onNoteChange,
    notes,
    vehicle,
    onTransportChange,
  } = useTripForm(formData);
  const addTrip = useAddTrip();
  const addCountry = useAddLocation();
  const addCity = useAddCity();
  const update = useUpdateTrip();
  const onSubmit = async () => {
    if (!start || !end || !location.name || !location.country_code) {
      return;
    }
    if (location.isCity && location.geonameid) {
      await addCountry.mutateAsync(location.country_code);
      await addCity.mutateAsync({
        geonameid: location.geonameid,
        country_code: location.country_code,
      });
    }
    await addTrip.mutateAsync({
      geonameid: location.geonameid,
      country_code: location.country_code,
      name: location.name,
      start_date: start.toISOString(),
      end_date: end.toISOString(),
      notes,
      vehicle,
    });
  };
  const onUpdate = async () => {
    if (formData && formData.id && start && end) {
      await update.mutateAsync({
        geonameid: location.geonameid,
        country_code: location.country_code,
        name: location.name,
        id: formData.id,
        start_date: start.toISOString(),
        end_date: end.toISOString(),
        notes,
        vehicle,
      });
    }
  };
  const countryData = getCountryData(location.country_code as TCountryCode);
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
    if (formData) {
      await onUpdate();
    } else {
      await onSubmit();
    }
    onClose();
  };
  const deleteTrip = useDeleteTrip();
  const onDelete = async (id?: string) => {
    if (!id) {
      console.error("No id");
      return;
    }
    await deleteTrip.mutateAsync(id);
    onClose();
  };
  const locationValue =
    location && countryName ? `${location.name}` + `, ${countryName}` : "";
  const hasValidDates = start && end;
  const title = formData ? "Trip Details" : "Add Trip";
  const actionLabel = formData ? "Update" : "Add Trip";
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
      <DialogContent sx={{ minWidth: 300, flexGrow: 1 }}>
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
        <Stack direction={"row"}>
          {vehicles.map((v) => (
            <Button
              sx={{ textTransform: "capitalize" }}
              fullWidth
              variant={v === vehicle ? "contained" : "outlined"}
              size="small"
              name={"vehicle"}
              onClick={() => onTransportChange(v)}
            >
              {v}
            </Button>
          ))}
        </Stack>

        <Typography sx={{ mt: 1, mb: 1 }}>Notes</Typography>
        <TextField
          value={notes}
          onChange={onNoteChange}
          fullWidth
          placeholder="Add notes or highlights"
        />
        <DialogOrDrawer onClose={close} open={form === "destination"}>
          <WhereForm
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
            disableElevation
            sx={{ m: 1, textTransform: "capitalize" }}
            onClick={submit}
            size="large"
            variant="contained"
          >
            {actionLabel}
          </Button>
          {formData && (
            <Button
              onClick={() => onDelete(formData.id)}
              sx={{ m: 1, textTransform: "capitalize" }}
              size="large"
              variant="outlined"
            >
              Delete
            </Button>
          )}
          <Button
            onClick={onClose}
            sx={{ m: 1, textTransform: "capitalize" }}
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
