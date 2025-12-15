import { Outlet, useNavigate } from "react-router";
import { useAuth } from "./providers/contexts/authContext";
import { LinearProgress } from "@mui/material";

export const AuthCheck: React.FC = () => {
  const auth = useAuth();
  const nav = useNavigate();
  if (auth.loading) {
    return <LinearProgress />;
  }
  if (!auth.user) {
    nav("login");
  }
  return <Outlet />;
};
