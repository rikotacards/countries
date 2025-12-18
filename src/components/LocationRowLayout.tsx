import {
  Avatar,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { ChevronRight } from "@mui/icons-material";
export interface LocationRowLayoutProps {
  locationName: string;
  flagImage?: string;
  visited?: boolean;
  buttons?: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  disableMore?: boolean;
  secondaryText?: string;
}
export const LocationRowLayout: React.FC<LocationRowLayoutProps> = ({
  buttons,
  flagImage,
  locationName,
  visited,
  icon,
  disableMore,
  onClick,
  secondaryText,
}) => {
  return (
    <ListItemButton
      onClick={() => {
        onClick?.();
      }}
    >
      {icon ? (
        <ListItemIcon>{icon}</ListItemIcon>
      ) : (
        <ListItemIcon>
          <Avatar sx={{ background: "transparent" }}>{flagImage}</Avatar>
        </ListItemIcon>
      )}
      <ListItemText
        primary={locationName}
        secondary={secondaryText}
      >
        {locationName}
      </ListItemText>
      {buttons}
      {visited && <CheckCircleIcon sx={{ ml: "auto" }} />}
      {!disableMore && (
        <IconButton>
          <ChevronRight />
        </IconButton>
      )}
    </ListItemButton>
  );
};
