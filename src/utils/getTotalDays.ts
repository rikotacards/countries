import dayjs from "dayjs";
import type { ITrip } from "../hooks/mutations/useAddTrip";

export const getTotalDays = (trips?: ITrip[]) => {
  let total = 0;
  if(!trips){
    return 0
  }
  trips.forEach((t) => {
    const startDate = dayjs(t.start_date);
    const endDate = dayjs(t.end_date);
    const days = endDate.diff(startDate, "day");
    total += days;
  });

  return total;
};
