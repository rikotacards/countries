import {
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
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
    <>
      <DialogTitle
        fontWeight={"bold"}
        sx={{ display: "flex", alignItems: "center" }}
      >
        Add Country or City
        <IconButton sx={{ ml: "auto" }} onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <TextField
        placeholder="Search Country or City"
        sx={{ p: 1 }}
        fullWidth
        value={text}
        onChange={onChange}
      />
      <DialogContent>
        <CountryAndCityList
          onClick={onSetLocation}
          onClose={onClose}
          filter={debounced}
        />
      </DialogContent>
    </>
  );
};
