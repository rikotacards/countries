import { Box, Typography } from "@mui/material";
interface StatLayoutProps {
  stat: string;
  desc: string;
}
export const StatLayout: React.FC<StatLayoutProps> = ({ stat, desc }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{ textAlign: "center" }}
        fontWeight={"bold"}
        color="primary"
        variant="h6"
      >
        {stat}
      </Typography>
      <Typography color="textSecondary" variant="body2">
        {desc}
      </Typography>
    </Box>
  );
};
