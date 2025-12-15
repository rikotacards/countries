import { AppBar, Box, IconButton, TextField, Toolbar } from "@mui/material";
import { useDebounce } from "../hooks/useDebounce";

import React from "react";
import { CountryAndCityList } from "./CountryAndCityList";
import { Close } from "@mui/icons-material";
import type { LocationProps } from "../hooks/useTripForm";
interface DestinationFormProps {
  onClose: () => void;
  location: LocationProps; 
  onSetLocation: (arg: LocationProps) => void;
}
export const DestinationForm: React.FC<DestinationFormProps> = ({
  onClose,
  onSetLocation, 
}) => {
  const [text, setText] = React.useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const debounced = useDebounce(text);

  return (
    <Box>
      <AppBar position="relative">
        <Toolbar>
          Search
          <IconButton sx={{ml:'auto'}} onClick={onClose}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <TextField
        placeholder="Search City or Country"
        sx={{ p: 1 }}
        fullWidth
        value={text}
        onChange={onChange}
      />
      <CountryAndCityList 
      onClick={onSetLocation}
      onClose={onClose}  filter={debounced} />
    </Box>
  );
};
