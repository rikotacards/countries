import { ArrowBackIosNew, Delete, MoreVert } from "@mui/icons-material";
import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import {
  getCountryData,
  getEmojiFlag,
  type TCountryCode,
} from "countries-list";
import { Cities } from "../components/Cities";
import React from "react";
import { useDeleteLocation } from "../hooks/mutations/useDeleteLocation";
import { TripsPage } from "./TripsPage";
interface LocationPageProps {
  countryCode?: TCountryCode;
  onClose: () => void;
}
export const LocationPage: React.FC<LocationPageProps> = ({
  countryCode,
  onClose,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const deleteCountry = useDeleteLocation();
  const onDelete = async () => {
    await deleteCountry.mutateAsync(countryCode as TCountryCode);
    onClose();
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const o = getCountryData(countryCode as TCountryCode);
  const { name } = o;
  const emoji = getEmojiFlag(countryCode as TCountryCode);
  const [tab, setTab] = React.useState(0);

  return (
    <Box>
      <Toolbar
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Box
          sx={{
            flex: 1,
          }}
        >
          <IconButton onClick={onClose}>
            <ArrowBackIosNew />
          </IconButton>
        </Box>
        <DialogTitle
          sx={{
            display: "flex",
            textAlign: "center",
            flexGrow: 1,
          }}
          fontWeight={"bold"}
          variant="h5"
        >
          {emoji} {name}
        </DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <IconButton id="basic-button" onClick={handleClick}>
            <MoreVert />
          </IconButton>
        </Box>
      </Toolbar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        <MenuItem onClick={onDelete}>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>
      <Tabs  value={tab} variant="fullWidth">
        <Tab sx={{ textTransform: "capitalize" }} onClick={() => setTab(0)} value={0} label="cities" />
        <Tab sx={{ textTransform: "capitalize" }} onClick={() => setTab(1)} label="Trips" />
      </Tabs>
      <DialogContent sx={{ p: 0 }}>
       {tab == 0 && <Cities countryCode={countryCode || ""} />}
       {tab == 1 && <TripsPage countryCode={countryCode} />}
      </DialogContent>
    </Box>
  );
};
