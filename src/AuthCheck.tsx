import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "./providers/contexts/authContext";
import { Box, CircularProgress } from "@mui/material";

export const AuthCheck: React.FC = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const l = useLocation();
  const page = l.pathname.slice(0);
  if (auth.loading) {
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          width: "100%",
          display: 'flex',
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!auth.user && page !== "/login") {
    nav("login");
  }
  if (auth.user && page == "/login") {
    nav("/");
  }
  return <Outlet />;
};
