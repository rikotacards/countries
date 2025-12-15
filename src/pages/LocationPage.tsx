import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import {
  getCountryData,
  getEmojiFlag,
  type TCountryCode,
} from "countries-list";
import {  useParams } from "react-router";
import { Cities } from "../components/Cities";
interface LocationPageProps {
  countryCode?: TCountryCode
  onClose: () => void;
}
export const LocationPage: React.FC<LocationPageProps> = ({countryCode, onClose}) => {
  const params = useParams();
  
  const o = getCountryData(countryCode as TCountryCode);
  const { name } = o;
  const emoji = getEmojiFlag(o.iso2);
  return (
    <Box>
      <Toolbar disableGutters>
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <IconButton sx={{position: 'absolute'}}  onClick={onClose}>
            <ArrowBackIosNew />
          </IconButton>
      
            <Typography
              variant="h6"
              fontWeight={"bold"}
              sx={{flexGrow:1, textAlign: "center" }}
            >
             {emoji} {name}
            </Typography>
        </Box>
      </Toolbar>
      <Cities countryCode={params.countryCode || ""} />
    </Box>
  );
};
