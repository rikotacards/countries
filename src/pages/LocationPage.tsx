import { ArrowBackIosNew } from "@mui/icons-material";
import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
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
  console.log('c', countryCode)
  const o = getCountryData(countryCode as TCountryCode);
  const { name } = o;
  const emoji = getEmojiFlag(o.iso2);
  return (
    <Box>
      <DialogTitle
        sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <IconButton sx={{position: 'absolute'}} onClick={onClose}>
          <ArrowBackIosNew />
        </IconButton>

        <Typography
          variant="h6"
          fontWeight={"bold"}
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          {emoji} {name}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ width: 500 }}>
        <Cities countryCode={countryCode || ""} />
      </DialogContent>
    </Box>
  );
};
