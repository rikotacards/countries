import { Box, Button, Typography } from "@mui/material";
import { useSignInWithGoogle } from "../hooks/mutations/useSignInWithGoogle";

export const LoginPage: React.FC = () => {
  const login = useSignInWithGoogle();
  const onLogin = async () => {
    await login.mutateAsync();
  };
  return (
    <Box sx={{}}>
      <Box
        sx={{
          position: "absolute",
          top: "40%",
          margin: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Typography fontWeight={"bold"} textAlign={"center"}>
          Welcome to Trips
        </Typography>
        <Typography textAlign={"center"}>
          Keep track of all countries and cities you've travelled to.
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
