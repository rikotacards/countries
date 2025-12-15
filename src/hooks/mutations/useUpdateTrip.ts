import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../utils/supabase";
import type { ITrip } from "./useAddTrip";
type ITripUpdate = Partial<ITrip> & { id: string };
export const useUpdateTrip = () => {
  const client = useQueryClient();
  return useMutation({
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["trips"] });
    },
    mutationFn: async (args: ITripUpdate) => {
      return await supabase.from("trips").update(args).eq("id", args.id);
    },
  });
};
