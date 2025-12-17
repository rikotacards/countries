import { Box, LinearProgress, Typography } from "@mui/material";
interface ProgressBarProps {
  value: number;
}
export const ProgressBar: React.FC<ProgressBarProps> = ({ value = 0 }) => {
  const percentage = (value/195) * 100;
  const rounded = percentage.toFixed(0)
  return (
    <Box
      sx={{ m: 2, display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <LinearProgress
        sx={{ width: "100%" }}
        variant="determinate"
        value={value}
        color='success'
      />
      <Typography color="primary" sx={{ ml: 2, mr: 1 }} variant="caption">
        {rounded}%
      </Typography>
    </Box>
  );
};
