import { Box, Typography } from "@mui/material";
import { StatLayout } from "../components/StatLayout";

export const StatsPage: React.FC = () => {
  return (
    <Box>
      <Typography p={2} variant="h5" fontWeight={"bold"}>
        Travel Stats
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <StatLayout stat={"25"} desc="Countries" />
        <StatLayout stat={"25"} desc="Cities" />
        <StatLayout stat={"14%"} desc="of the world" />
      </Box>
    </Box>
  );
};
