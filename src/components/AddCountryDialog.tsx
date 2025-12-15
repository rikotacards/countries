import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Toolbar,
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
      <AppBar variant="outlined" position="sticky">
        <Toolbar>
          <Typography>Add your visits</Typography>
          <IconButton onClick={onClose} sx={{ ml: "auto" }}>
            <Close color="action" />
          </IconButton>
        </Toolbar>
      </AppBar>
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
      <CountryList filter={filter} />
    </DialogOrDrawer>
  );
};
