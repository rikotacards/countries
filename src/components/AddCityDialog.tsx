import {
  AppBar,
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { DialogOrDrawer } from "./DialogOrDrawer";
import { Close } from "@mui/icons-material";
import React from "react";
import { CityList } from "./CityList";
import { useDebounce } from "../hooks/useDebounce";
interface AddCountryDialogProps {
  open: boolean;
  onClose: () => void;
  countryCode: string;
}
export const AddCityDialog: React.FC<AddCountryDialogProps> = ({
  open,
  onClose,
  countryCode,
}) => {
  const [filter, setFilter] = React.useState("");
  const debounce = useDebounce(filter);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("change", e.target.value);
    setFilter(e.target.value);
  };
  React.useEffect(() => {
    setFilter("");
  }, [open]);
  return (
    <DialogOrDrawer open={open} onClose={onClose}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography>Add your visits</Typography>
          <IconButton onClick={onClose} sx={{ ml: "auto" }}>
            <Close color="action" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <TextField
        sx={{ p: 1, position: 'sticky' }}
        placeholder="Search"
        autoFocus
        value={filter}
        onChange={onChange}
        fullWidth
      />

      <CityList countryCode={countryCode} filter={debounce} />
    </DialogOrDrawer>
  );
};
