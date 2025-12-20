import { Box, Button, Divider, Typography, Container } from "@mui/material";
import { useSignInWithGoogle } from "../hooks/mutations/useSignInWithGoogle";
import "./loginPage.css";
import GoogleIcon from "@mui/icons-material/Google"; // Ensure @mui/icons-material is installed
export const LoginPage: React.FC = () => {
  const login = useSignInWithGoogle();

  const onLogin = async () => {
    await login.mutateAsync();
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        minHeight: "70vh",
        p:2,
        // Using a dark background often makes "sunset" gradients pop more
        backgroundColor: "background.default", 
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 0,
            textAlign: "center",
          }}
        >
          <Typography
            className="sunset-text"
            variant="h3" // Increased size for impact
            fontWeight={700}
            sx={{ mb: 1 }}
          >
            Welcome to Countries.fyi
          </Typography>

          <Divider sx={{ width: "100%", my: 3, opacity: 0.6 }} />

          <Typography
            className="sunset-text"
            variant="h5"
            fontWeight={600}
            sx={{ mb: 4 }}
          >
            Your trips in one place
          </Typography>

          <Button
            fullWidth
            sx={{ 
              mt: 2, 
              py: 1.5,
              textTransform: "none", // More modern than capitalize
            }}
            startIcon={<GoogleIcon/>}
            variant="contained"
            size="large"
            color='inherit'
            onClick={onLogin}
          >
            Log in with Google
          </Button>
        </Box>
      </Container>
    </Box>
  );
};