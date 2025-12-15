import { Box, Typography } from "@mui/material";
interface NoTripsProps {
  toggleOpen: () => void;
}
export const NoTrips: React.FC<NoTripsProps> = ({ toggleOpen }) => {
  return (
    <Box
      onClick={toggleOpen}
      sx={{
        width: "100%",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        cursor: "pointer",
      }}
    >
      <Typography fontWeight={"bold"} variant="body1" color="textSecondary">
        No trips logged!
      </Typography>
      <Box>
        <Typography variant="body1" color="textSecondary">
          Tap here or the search bar to add a trip
        </Typography>
      </Box>
    </Box>
  );
};
