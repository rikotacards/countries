
import { useMutation } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

export const useSignOut = () => {
  return useMutation({
    mutationFn: async () =>
      await supabase.auth.signOut(),
  });
};
