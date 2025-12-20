import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { CountryList } from "./CountryList";
import { DialogOrDrawer } from "./DialogOrDrawer";
import { Cancel, Close, Search } from "@mui/icons-material";
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
      <DialogTitle
        variant="h5"
        fontWeight={"bold"}
        sx={{ display: "flex", alignItems: "center" }}
      >
        Add your visits
        <IconButton onClick={onClose} sx={{ ml: "auto" }}>
          <Close color="action" />
        </IconButton>
      </DialogTitle>
      <Box sx={{ pl: 2, pr:2, display: "flex", position: "sticky", top: 0 }}>
        <TextField
          placeholder="Search for a Country"
          value={filter}
          onChange={onChange}
          fullWidth
          size='small'
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start"><Search fontSize="small" color='disabled'/></InputAdornment>,
              endAdornment: (
                <InputAdornment
                  sx={{ visibility: filter ? "visible" : "hidden" }}
                  position="end"
                >
                  <IconButton onClick={() => setFilter('')}>
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
