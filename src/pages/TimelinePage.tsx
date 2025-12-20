import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Box, Typography } from "@mui/material";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { useTrips } from "../hooks/queries/useTrips";
import { formatOptions } from "../utils/dateFormat";
import { getEmojiFlag } from "countries-list";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import TrainIcon from "@mui/icons-material/Train";
import DirectionsBoatIcon from "@mui/icons-material/DirectionsBoat";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
const iconMap = {
  Plane: <AirplanemodeActiveIcon fontSize="small" />,
  Train: <TrainIcon fontSize="small" />,
  Boat: <DirectionsBoatIcon fontSize="small" />,
  Car: <DirectionsCarFilledIcon fontSize="small" />,
};

export const TimeLinePage: React.FC = () => {
  const countriesVisited = useTrips();
  const line = countriesVisited.data?.map((trip, i) => {
    // @ts-expect-error map
    const icon = iconMap[trip?.vehicle];
    return (
      <TimelineItem>
        <TimelineOppositeContent sx={{ mt: 1 }} color="text.secondary">
          <Typography fontWeight={"bold"} variant="caption">
            {new Date(trip?.start_date).toLocaleDateString(
              "en-GB",
              formatOptions
            )}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot variant="outlined" sx={{ background: "transparent" }}>
            {icon}
          </TimelineDot>
          {i !== countriesVisited?.data.length - 1 && <TimelineConnector />}
        </TimelineSeparator>

        <TimelineContent sx={{ mt: 1, display: "flex", flexDirection: "row" }}>
          {getEmojiFlag(trip.country_code)}
          <Typography sx={{ ml: 1 }}>{trip.name}</Typography>
        </TimelineContent>
      </TimelineItem>
    );
  });
  return (
    <Box>
      <Timeline position="right">{line}</Timeline>
    </Box>
  );
};
