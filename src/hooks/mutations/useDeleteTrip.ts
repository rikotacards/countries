import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

export const useDeleteTrip = () => {
  const client = useQueryClient();
  return useMutation({
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['trips']});
    },
    mutationFn: async (id:  string) => {
      await supabase.from("trips").delete().eq("id", id);
    },
  });
};
