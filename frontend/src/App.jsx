import './App.css'
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Stack, Button, TextField, Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function App() {

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
          <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
              <PersonIcon />
          </Avatar>
          <Box 
            component="form"
            // onSubmit={handleSubmit} 
            noValidate sx={{ mt: 1 }}
          >
            <Stack spacing={2}>
              <TextField id="outlined-basic" label="Username" variant="outlined" />
              <TextField id="outlined-basic" label="Password" variant="outlined" />
              <Button color='warning' variant="outlined">Login</Button>
              </Stack>
          </Box>
      </Box>
    </>
  )
}

export default App
