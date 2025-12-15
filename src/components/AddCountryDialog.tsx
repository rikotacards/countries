import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { CountryList } from "./CountryList";
import { DialogOrDrawer } from "./DialogOrDrawer";
import { Cancel, Close } from "@mui/icons-material";
import React from "react";
interface AddCountryDialogProps {
  open: boolean;
  onClose: () => void;
}
export const AddCountryDialog: React.FC<AddCountryDialogProps> = ({
  open,
  onClose,
}) => {
  const [filter, setFilter] = React.useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };
  React.useEffect(() => {
    setFilter("");
  }, [open]);
  return (
    <DialogOrDrawer open={open} onClose={onClose}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        <Typography fontWeight={"bold"} variant="h5">
          Add your visits
        </Typography>
        <IconButton onClick={onClose} sx={{ ml: "auto" }}>
          <Close color="action" />
        </IconButton>
      </DialogTitle>
      <Box sx={{ p: 1, display: "flex", position: "sticky", top: 0 }}>
        <TextField
          placeholder="Search for a Country"
          value={filter}
          onChange={onChange}
          fullWidth
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment
                  sx={{ visibility: filter ? "visible" : "hidden" }}
                  position="end"
                >
                  <IconButton>
                    <Cancel />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <DialogContent sx={{ p: 0 }}>
        <CountryList filter={filter} />
      </DialogContent>
    </DialogOrDrawer>
  );
};
