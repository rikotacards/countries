import type { PickerValue } from "@mui/x-date-pickers/internals";
import React from "react";
import { type ITrip } from "./mutations/useAddTrip";
import type { TCountryCode } from "countries-list";
import dayjs from "dayjs";
export interface LocationProps {
  geonameid?: string;
  name: string;
  country_code: TCountryCode;
  isCity?: boolean;
}
const convertIsoToPickerValue = (isoString?: string) => {
  // Check if the string is valid/present before attempting conversion
  if (!isoString) {
    return null; // Return null if there's no date data
  }

  // The magic step: JavaScript's Date constructor handles ISO strings natively!
  return dayjs(isoString);
};
export const useTripForm = (formData?: ITrip) => {
  const [location, setLocation] = React.useState({
    name: formData?.name,
    country_code: formData?.country_code,
  } as LocationProps);
  const onSetLocation = (location: LocationProps) => {
    setLocation(location);
  };
  const [start, setStart] = React.useState<PickerValue | null>(
    convertIsoToPickerValue(formData?.start_date)
  );
  const [end, setEnd] = React.useState<PickerValue | null>(
    convertIsoToPickerValue(formData?.end_date)
  );

  const [notes, setNotes] = React.useState(formData?.notes);
  const onNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNotes(e.target.value);
  };
  const onSetStart = (date: PickerValue) => {
    setStart(date);
  };
  const onSetEnd = (date: PickerValue) => {
    setEnd(date);
  };
  const [vehicle, setTransport] = React.useState(formData?.vehicle);
  const onTransportChange = (v: string) => {
    setTransport(v);
  };
  return {
    start,
    end,
    onSetEnd,
    onSetLocation,
    location,
    onTransportChange,
    vehicle,
    onSetStart,
    notes,
    onNoteChange,
  };
};
