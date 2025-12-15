import { useMutation } from "@tanstack/react-query";
import supabase from "../../utils/supabase";

export const useSignInWithGoogle = () => {
  return useMutation({
    mutationFn: async () =>
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // Optional: Specify a redirect URL after successful login.
          // This URL MUST be in your Supabase and Google console authorized list.
          // If omitted, it will use the Site URL defined in your Supabase settings.
          // redirectTo: 'https://localhost:5173'
        },
      }),
  });
};
