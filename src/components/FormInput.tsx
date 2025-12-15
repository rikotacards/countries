import { Box, Card, Typography } from "@mui/material";
interface Args {
  onClick: () => void;
  label: string;
  value?: string;
}
export const FormInput: React.FC<Args> = ({ onClick, value, label }) => {
  return (
    <Box
      component={Card}
      variant="outlined"
      onClick={onClick}
      sx={{
        mb: 2,
        p: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Typography variant="body2" sx={{ mr: 1 }} color="textSecondary">
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          ml: "auto",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};
