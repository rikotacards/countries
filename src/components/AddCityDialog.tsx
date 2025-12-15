import {
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
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
      <DialogTitle sx={{display: 'flex', alignItems: 'center'}}>
        <Typography fontWeight={"bold"} variant="h5">
          Add your visits
        </Typography>
        <IconButton onClick={onClose} sx={{ ml: "auto" }}>
          <Close color="action" />
        </IconButton>
      </DialogTitle>
      <TextField
        sx={{ p: 1, position: "sticky" }}
        placeholder="Search"
        autoFocus
        value={filter}
        onChange={onChange}
        fullWidth
      />
      <DialogContent sx={{p:0}}>
        <CityList countryCode={countryCode} filter={debounce} />
      </DialogContent>
    </DialogOrDrawer>
  );
};
