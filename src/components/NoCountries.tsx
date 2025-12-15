import { Box, Typography } from "@mui/material";
interface NoTripsProps {
  toggleOpen: () => void;
}
export const NoCountries: React.FC<NoTripsProps> = ({ toggleOpen }) => {
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
        No countries logged!
      </Typography>
      <Box>
        <Typography variant="body1" color="textSecondary">
          Tap here or the + button to add a trip
        </Typography>
      </Box>
    </Box>
  );
};
