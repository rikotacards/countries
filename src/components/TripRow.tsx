import { MoreVert } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  getCountryData,
  getEmojiFlag,
  type TCountryCode,
} from "countries-list";
import dayjs from "dayjs";
import { formatOptions } from "../utils/dateFormat";
interface TripRowProps {
  countryCode: string;
  name: string;
  start: string;
  end: string;
  onClick?: () => void;
}

export const TripRow: React.FC<TripRowProps> = ({
  countryCode,
  name,
  start,
  end,
  onClick,
}) => {
  const emoji = getEmojiFlag(countryCode as TCountryCode);
  const country = getCountryData(countryCode as TCountryCode);
  const { name: countryName } = country;

  const startDate = new Date(start).toLocaleDateString("en-GB", formatOptions);
  const endDate = new Date(end).toLocaleDateString("en-GB", formatOptions);

  const durationCount = dayjs(new Date(end)).diff(
    dayjs(new Date(start)),
    "day"
  );
  const duration = <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
    <Typography variant='caption'>{`${startDate} - ${endDate}`}</Typography>
    <Typography color='textPrimary' variant="caption" sx={{ml:1}}>{durationCount} Days</Typography>
  </Box>
  const location = (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Typography fontWeight={"bold"}>{name}</Typography>
      {name !== countryName && (
        <Typography fontWeight={"bold"}>{`, ${countryName}`}</Typography>
      )}
    </Box>
  );
  return (
    <ListItemButton onClick={onClick}>
      <ListItemIcon>
        <Avatar sx={{ background: "transparent" }}>{emoji}</Avatar>
      </ListItemIcon>
      <ListItemText primary={location} secondary={duration} />
      <IconButton>
        <MoreVert />
      </IconButton>
    </ListItemButton>
  );
};
