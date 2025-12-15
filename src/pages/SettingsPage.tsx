import { Box, Button, Typography } from "@mui/material";
import { useSignOut } from "../hooks/mutations/useSignOut";

export const SettingsPage: React.FC = () => {
  const logout = useSignOut();
  return (
    <Box sx={{ p: 2 }}>
      <Typography fontWeight={"bold"} variant="h5">
        Settings
      </Typography>
      <Box sx={{ mt: 1 }}>
        <Button
          onClick={() => logout.mutateAsync()}
          variant="outlined"
          sx={{ textTransform: "capitalize" }}
          color="error"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};
