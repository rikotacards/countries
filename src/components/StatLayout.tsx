import { Box, Paper, Typography } from "@mui/material";
interface StatLayoutProps {
  stat: string;
  desc: string;
}
export const StatLayout: React.FC<StatLayoutProps> = ({ stat, desc }) => {
  return (
    <Box
    component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width:'100%',
        flexGrow:1,
        m:1,
        p:1
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
