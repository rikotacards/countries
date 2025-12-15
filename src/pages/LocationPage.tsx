import { ArrowBackIosNew } from "@mui/icons-material";
import { Box, IconButton, Toolbar, Typography } from "@mui/material";
import {
  getCountryData,
  getEmojiFlag,
  type TCountryCode,
} from "countries-list";
import { useNavigate, useParams } from "react-router";
import { Cities } from "../components/Cities";

export const LocationPage: React.FC = () => {
  const params = useParams();
  const nav = useNavigate();
  const onBack = () => {
    nav(-1);
  };
  const o = getCountryData(params.countryCode as TCountryCode);
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
          <IconButton sx={{position: 'absolute'}}  onClick={onBack}>
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
