import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Box, Typography } from "@mui/material";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

export const TimeLinePage: React.FC = () => (
  <Box>
    <Typography sx={{ alignSelf: "center" }}>2025</Typography>
    <Timeline position="right">
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          Dec 16 2024
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="secondary" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Norway</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          Dec 20 2024
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot color="success" />
        </TimelineSeparator>
        <TimelineContent>Finland</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          Dec 20 2024
        </TimelineOppositeContent>

        <TimelineSeparator>
          <TimelineConnector />

          <TimelineDot color="success" />
        </TimelineSeparator>
        <TimelineContent>Finland</TimelineContent>
      </TimelineItem>
    </Timeline>
  </Box>
);
