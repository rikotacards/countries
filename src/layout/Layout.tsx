import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import type { PropsWithChildren } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "../providers/contexts/authContext";
import React from "react";
export const Layout: React.FC<PropsWithChildren> = () => {
  const nav = useNavigate();
  const auth = useAuth();
  const isLoggedIn = auth.session?.user;
  const l = useLocation();
  const page = l.pathname.slice(0);
  const [selected, setSelected] = React.useState<string | null>("/");
  React.useEffect(() => {
    setSelected(page);
  }, [page]);
  const goSettings = () => {
    nav("settings");
  };
  const tabs = [
    {
      label: "Visited",
      path: "/",
    },
    {
      label: "Trips",
      path: "/trips",
    },
    {
      label: "Stats",
      path: "/stats",
    },
  ];
  const onClick = (path: string) => {
    setSelected(path);
    nav(path);
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
        <Toolbar variant="dense" sx={{ display: "flex", flexDirection: "row" }}>
          <Tabs  value={selected}>
            {tabs.map((t) => (
              <Tab
                key={t.path}
                sx={{ textTransform: "capitalize" }}
                label={t.label}
                value={t.path}
                onClick={() => onClick(t.path)}
              />
            ))}
            <Tab sx={{ display: "none" }} value={"/settings"} />
          </Tabs>

          <IconButton sx={{ ml: "auto" }} onClick={goSettings}>
            <Avatar
              src={auth.user?.user_metadata?.["avatar_url"]}
              sx={(t) => ({
                border: page === "/settings" ? "2px solid" : undefined,
                color: t.palette.primary.main,
                height: "30px",
                width: "30px",
                visibility: isLoggedIn ? "visible" : "hidden",
              })}
            />
          </IconButton>
        </Toolbar>
        <Divider sx={{ width: "100%" }} />
      </AppBar>
    </Box>
  );
};
