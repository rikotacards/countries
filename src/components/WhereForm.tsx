import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";

import React from "react";
import { CountryListTrips } from "./CountryListTrips";
import { Close } from "@mui/icons-material";
import type { LocationProps } from "../hooks/useTripForm";
import { CityListTrips } from "./CityListTrips";
interface DestinationFormProps {
  onClose: () => void;
  location: LocationProps;
  onSetLocation: (arg: LocationProps) => void;
}
export const WhereForm: React.FC<DestinationFormProps> = ({
  onClose,
  onSetLocation,
}) => {
  const [tab, setTab] = React.useState(0);
  const [text, setText] = React.useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const debounced = useDebounce(text);

  return (
    <>
      <DialogTitle
        fontWeight={"bold"}
        sx={{ display: "flex", flexDirection: "column", pb: 0 }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          Where
          <IconButton sx={{ ml: "auto" }} onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <Tabs variant="fullWidth" value={tab}>
        <Tab
          sx={{ textTransform: "capitalize" }}
          onClick={() => setTab(0)}
          label={"Country"}
          value={0}
        />
        <Tab
          sx={{ textTransform: "capitalize" }}
          onClick={() => setTab(1)}
          label={"City"}
          value={1}
        />
      </Tabs>
      <TextField
        placeholder="Search"
        sx={{ p: 1 }}
        fullWidth
        value={text}
        onChange={onChange}
      />
      <DialogContent sx={{p:0}}>
        {tab === 0 && (
          <CountryListTrips
            onClick={onSetLocation}
            onClose={onClose}
            filter={debounced}
          />
        )}
        {tab && (
          <CityListTrips
            onClick={onSetLocation}
            onClose={onClose}
            filter={debounced}
          />
        )}
      </DialogContent>
    </>
  );
};
