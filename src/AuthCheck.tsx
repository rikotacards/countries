import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "./providers/contexts/authContext";
import { LinearProgress } from "@mui/material";

export const AuthCheck: React.FC = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const l = useLocation();
  const page = l.pathname.slice(0);
  if (auth.loading) {
    return <LinearProgress />;
  }
  if (!auth.user && page !== "login") {
    nav("login");
  }
  return <Outlet />;
};
