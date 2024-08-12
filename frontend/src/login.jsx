import { Box, Stack, Button, TextField, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const Login = () => {
  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("submit!");
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        my="2rem"
        border="2px solid" // Color defined in theme globally
        borderColor="warning.main" // Assuming you have this defined in your theme
        padding="2rem"
        borderRadius="10px"
        maxWidth="30rem"
        minWidth="20rem"
        style={{ margin: "auto" }} // Style to center Box horizontally
      >
        <Stack spacing={2} alignItems="stretch">
          <Avatar
            color="warning" // You'll need to adjust this in the theme if possible
            style={{ margin: "auto" }} // Style to center Avatar
          >
            <PersonIcon />
          </Avatar>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            autoComplete="username"
            color="warning"
            fullWidth
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            autoComplete="current-password"
            color="warning"
            fullWidth
          />
          <Button
            type="submit"
            color="warning" // You'll need this color available in your theme for Button
            variant="contained"
            fullWidth
          >
            Login
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Login;
