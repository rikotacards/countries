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

export const TimeLinePage: React.FC = () => {
  const countriesVisited = useTrips();
  const line = countriesVisited.data?.map((trip, i) => {
    return (
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          <Typography variant="caption">
            {new Date(trip.start_date).toLocaleDateString(
              "en-GB",
              formatOptions
            )}
          </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="primary" />
          {i !== countriesVisited?.data.length - 1 && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent>{trip.name}</TimelineContent>
      </TimelineItem>
    );
  });
  return (
    <Box>
      <Timeline position="right">{line}</Timeline>
    </Box>
  );
};
