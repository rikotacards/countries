import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Toolbar,
} from "@mui/material";
import type { PropsWithChildren } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../providers/contexts/authContext";

export const Layout: React.FC<PropsWithChildren> = () => {
  const nav = useNavigate();
  const auth = useAuth();
  const l = useLocation();
  const page = l.pathname.slice(0);
  console.log(page);
  const goStats = () => {
    nav("stats");
  };
  const goVisited = () => {
    nav("/");
  };
  const goTrips = () => {
    nav("trips");
  };
  const goSettings = () => {
    nav("settings");
  };
  return (
    <Box>
      <Toolbar />
      <main>
        <Outlet />
      </main>
      <Toolbar />
      <AppBar
        variant="outlined"
        position="fixed"
        sx={{
          background: "transparent",
          border: 0,
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar>
          <Button
            sx={{
              fontWeight: page === "/" ? "bold" : undefined,
              textTransform: "capitalize",
            }}
            onClick={goVisited}
          >
            Visited
          </Button>
          <Button
            sx={{
              fontWeight: page === "/trips" ? "bold" : undefined,
              textTransform: "capitalize",
            }}
            onClick={goTrips}
          >
            Trips
          </Button>
          <Button
            sx={{
              fontWeight: page === "/stats" ? "bold" : undefined,
              textTransform: "capitalize",
            }}
            onClick={goStats}
          >
            Stats
          </Button>
          <IconButton sx={{ ml: "auto" }} onClick={goSettings}>
            <Avatar
              src={auth.user?.user_metadata?.["avatar_url"]}
              sx={{ height: "30px", width: "30px" }}
            />
          </IconButton>
        </Toolbar>
        <Divider />
      </AppBar>
    </Box>
  );
};
