import {
  Box,
  Paper,
  Skeleton,
  Typography,
  type TypographyProps,
} from "@mui/material";
interface StatLayoutProps {
  stat: string;
  desc: string;
  isLoading?: boolean;
  textColor?: TypographyProps["color"];
}
export const StatLayout: React.FC<StatLayoutProps> = ({
  textColor,
  isLoading,
  stat,
  desc,
}) => {
  return (
    <Box
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        m: 1,
        width: "100%",
        p: 1,
      }}
    >
      {isLoading ? (
        <Skeleton variant="text" />
      ) : (
        <Typography
          sx={{ textAlign: "center" }}
          fontWeight={"bold"}
          color={textColor || "primary"}
          variant="h6"
        >
          {stat}
        </Typography>
      )}
      <Typography color="textSecondary" variant="caption">
        {desc}
      </Typography>
    </Box>
  );
};
