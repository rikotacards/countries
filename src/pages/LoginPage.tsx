import { Box, Button, Typography } from "@mui/material";
import { useSignInWithGoogle } from "../hooks/mutations/useSignInWithGoogle";
export const LoginPage: React.FC = () => {
  const login = useSignInWithGoogle();
  const onLogin = async () => {
    await login.mutateAsync();
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height:'100%'
      }}
    >
      <Box
        sx={{
          flexGrow:1,
          // Optional: Add a max-width to prevent the content from stretching too wide
          maxWidth: 400,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          // The inner box is now centered automatically by the parent's flex properties.
          p: 2,
        }}
      >
        <Typography fontWeight={"bold"} textAlign={"center"}>
          Welcome to Countries.fyi
        </Typography>
        <Typography textAlign={"center"}>
          Track of all countries and cities you've traveled to.
        </Typography>

        <Button
          sx={{ mt: 1, textTransform: "capitalize" }}
          variant="contained"
          onClick={() => onLogin()}
        >
          Log in with Google
        </Button>
      </Box>
    </Box>
  );
};
