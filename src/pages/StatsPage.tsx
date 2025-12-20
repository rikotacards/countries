import { Box, Stack, Typography } from "@mui/material";
import { StatLayout } from "../components/StatLayout";
import { useCountriesVisited } from "../hooks/queries/useVisited";
import { useCitiesVisited } from "../hooks/queries/useCitiesVisited";
import { TimeLinePage } from "./TimelinePage";
import { useTrips } from "../hooks/queries/useTrips";
import { VehicleCard } from "../components/VehicleCard";
import { AirplanemodeActive, Train } from "@mui/icons-material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LuggageIcon from "@mui/icons-material/Luggage";
import DirectionsBoatFilledIcon from "@mui/icons-material/DirectionsBoatFilled";
import LightModeIcon from "@mui/icons-material/LightMode";
import { getTotalDays } from "../utils/getTotalDays";
export const StatsPage: React.FC = () => {
  const countryCount = useCountriesVisited().data?.length || 0;
  const percentage = (countryCount / 195) * 100;
  const rounded = percentage.toFixed(0);
  const getCities = useCitiesVisited();
  const trips = useTrips();
  const tripCount = trips.data?.length || 0;
  const totalDays = getTotalDays(trips.data)
  const flightCount =
    trips.data?.filter((t) => t.vehicle?.toLowerCase() === "plane")?.length ||
    0;
  const trainCount =
    trips.data?.filter((t) => t.vehicle?.toLowerCase() === "train")?.length ||
    0;
  const boatCount =
    trips.data?.filter((t) => t.vehicle?.toLowerCase() === "boat")?.length || 0;
  const carCount =
    trips.data?.filter((t) => t.vehicle?.toLowerCase() === "car")?.length || 0;

  const cityCount = getCities("")?.data?.length || 0;
  return (
    <Box>
      <Typography p={2} px={2} variant="h5" fontWeight={"bold"}>
        Travel Stats
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          px: 1,
        }}
      >
        <Stack direction="row">
          <StatLayout
            isLoading={trips.isLoading}
            stat={`${countryCount}`}
            desc="Countries"
          />
          <StatLayout
            isLoading={trips.isLoading}
            stat={`${cityCount}` || "0"}
            desc="Cities"
          />
          <StatLayout
            isLoading={trips.isLoading}
            stat={`${rounded}%`}
            desc="of the world"
          />
        </Stack>
        <Stack display="flex" flexWrap={"wrap"} direction="row">
          <Stack sx={{display: 'flex', width:'100%'}} direction={'row'}>

          <VehicleCard
            icon={<LuggageIcon />}
            vehicle="Trips"
            stats={tripCount}
            />
          <VehicleCard
            icon={<LightModeIcon />}
            vehicle="Days abroad"
            stats={totalDays}
            />
            </Stack>
          <VehicleCard
            icon={<AirplanemodeActive />}
            vehicle="Flights"
            stats={flightCount}
          />
          <VehicleCard icon={<Train />} vehicle="Flights" stats={trainCount} />
          <VehicleCard
            icon={<DirectionsBoatFilledIcon />}
            vehicle="Boats"
            stats={boatCount}
          />
          <VehicleCard
            icon={<DirectionsCarIcon />}
            stats={carCount}
            vehicle="Cars"
          />
        </Stack>
      </Box>
      <TimeLinePage />
    </Box>
  );
};
