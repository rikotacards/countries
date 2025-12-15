import type { PickerValue } from "@mui/x-date-pickers/internals";
import React from "react";
import { useAddTrip, type ITrip } from "./mutations/useAddTrip";
import type { TCountryCode } from "countries-list";
import dayjs from "dayjs";
import { useUpdateTrip } from "./mutations/useUpdateTrip";
export interface LocationProps {
  geonameid?: string;
  name: string;
  countryCode: TCountryCode;
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
  const submit = useAddTrip();
  const update = useUpdateTrip();
  const [location, setLocation] = React.useState({
    name: formData?.name,
    countryCode: formData?.countryCode,
  } as LocationProps);
  const onSetLocation = (location: LocationProps) => {
    setLocation(location);
  };
  const [start, setStart] = React.useState<PickerValue | null | Date>(
    convertIsoToPickerValue(formData?.start_date)
  );
  const [end, setEnd] = React.useState<PickerValue | null | Date>(
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
  const onSubmit = async () => {
    if (!start || !end || !location.name || !location.countryCode) {
      return;
    }
    if (formData && formData.id) {
      await update.mutateAsync({
        ...location,
        start_date: start.toISOString(),
        end_date: end.toISOString(),
        notes,
        id: formData.id,
      });
    } else {
      await submit.mutateAsync({
        ...location,
        start_date: start.toISOString(),
        end_date: end.toISOString(),
        notes,
      });
    }
  };
  return {
    start,
    end,
    onSetEnd,
    onSetLocation,
    location,
    onSetStart,
    onSubmit,
    notes,
    onNoteChange,
    submitLoading: submit.isPending,
  };
};
