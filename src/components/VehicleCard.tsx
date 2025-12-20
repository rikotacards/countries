import { Box, Card, Typography } from "@mui/material";
import { Circle } from "@mui/icons-material";
interface VehicleCardProps {
  icon?: React.ReactNode;
  stats?: number;
  vehicle?: string;
}
export const VehicleCard: React.FC<VehicleCardProps> = ({
  stats,
  vehicle,
  icon,
}) => {
  return (
    <Card sx={{width:'100%', display: "flex", p: 2, m: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        {icon || <Circle />}
        <Typography sx={{ ml: 1 }} fontWeight={"bold"}>
          {stats || 0}
        </Typography>
        <Typography variant="caption" sx={{textWrap: 'nowrap', ml: 1 }} color="textSecondary">
          {vehicle || "NA"}
        </Typography>
      </Box>
    </Card>
  );
};
