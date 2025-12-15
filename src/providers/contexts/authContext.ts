import type { Session } from "@supabase/supabase-js";
import React from "react";
interface IAuth {
    session: Session | null;
    user: Session['user'] | null;
    loading: boolean;
}
export const AuthContext = React.createContext({} as IAuth)
export const useAuth = () => React.useContext(AuthContext)