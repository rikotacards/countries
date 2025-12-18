import { Box, Typography } from "@mui/material";
import { StatLayout } from "../components/StatLayout";
import { useCountriesVisited } from "../hooks/queries/useVisited";
import { useCitiesVisited } from "../hooks/queries/useCitiesVisited";

export const StatsPage: React.FC = () => {
  const countryCount = useCountriesVisited().data?.length;
  const getCities = useCitiesVisited();
  const cityCount = getCities("")?.data;
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
        <StatLayout stat={`${countryCount}`} desc="Countries" />
        <StatLayout stat={`${cityCount}` || '0'} desc="Cities" />
        <StatLayout stat={"14%"} desc="of the world" />
      </Box>
    </Box>
  );
};
