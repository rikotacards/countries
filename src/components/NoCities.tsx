import { Box, Typography } from "@mui/material";
interface NoTripsProps {
  toggleOpen: () => void;
}
export const NoCities: React.FC<NoTripsProps> = ({ toggleOpen }) => {
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
        No cities logged!
      </Typography>
      <Box>
        <Typography variant="body1" color="textSecondary">
          Tap here or the plus icon to add a city.
        </Typography>
      </Box>
    </Box>
  );
};
