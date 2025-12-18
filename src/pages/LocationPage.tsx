import { ArrowBackIosNew } from "@mui/icons-material";
import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  Toolbar,
} from "@mui/material";
import {
  getCountryData,
  getEmojiFlag,
  type TCountryCode,
} from "countries-list";
import { Cities } from "../components/Cities";
interface LocationPageProps {
  countryCode?: TCountryCode;
  onClose: () => void;
}
export const LocationPage: React.FC<LocationPageProps> = ({
  countryCode,
  onClose,
}) => {
  const o = getCountryData(countryCode as TCountryCode);
  const { name } = o;
  const emoji = getEmojiFlag(countryCode as TCountryCode);
  return (
    <Box>
      <Toolbar
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <IconButton onClick={onClose}>
          <ArrowBackIosNew />
        </IconButton>
        <DialogTitle fontWeight={"bold"} variant="h5">
          {emoji} {name}
        </DialogTitle>
      </Toolbar>
      <DialogContent sx={{ p: 0 }}>
        <Cities countryCode={countryCode || ""} />
      </DialogContent>
    </Box>
  );
};
