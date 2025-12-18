import { Box, Card, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";
interface Args extends PropsWithChildren {
  onClick: () => void;
  label: string;
  value?: string;
}
export const FormInput: React.FC<Args> = ({
  children,
  onClick,
  value,
  label,
}) => {
  return (
    <Box
      component={Card}
      sx={{ display: "flex", flexDirection: "column", mb: 2 }}
    >
      <Box
        onClick={onClick}
        sx={{
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
      {children}
    </Box>
  );
};
