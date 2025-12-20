import { Box, Button, Card, Switch, Typography } from "@mui/material";
import { useSignOut } from "../hooks/mutations/useSignOut";

export const SettingsPage: React.FC = () => {
  const logout = useSignOut();
  return (
    <Box sx={{ p: 2 }}>
      <Typography sx={{ mb: 2 }} fontWeight={"bold"} variant="h5">
        Settings
      </Typography>
      <Card
        variant="outlined"
        sx={{ display: "flex", alignItems: "center", p: 2 }}
      >
        <Typography variant="body2">Light mode (coming soon)</Typography>
        <Switch size="small" sx={{ ml: "auto" }} disabled />
      </Card>
      <Box sx={{ mt: 1 }}>
        <Button
          fullWidth
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
