import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


export default function SignIn() {

const [open,setOpen] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    axios.post('http://localhost:8000/api/handlegendata', data).then((response) => {
      console.log(response);
    });
    setOpen(true);
    console.log({
      email: data.get('email'),
      frequency: data.get('frequency'),
      amplitude: data.get('amplitude'),
      gentype: data.get('gentype'),
    });
  };

  const handleSubmitFS = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    axios.post('http://localhost:8000/api/handlegenfourier', data).then((response) => {
      console.log(response);
    });
    setOpen(true);
    console.log({
      email: data.get('email'),
      n_value: data.get('n-value'),
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [gentype,setGenType] = React.useState('Sine-Wave');
  const handleChange = (event) => {
    setGenType(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            boxShadow: '0px 0px 69px rgba(0, 0, 0, 0.1)',
            marginTop: 8,
            marginBottom: 8,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Function Generator
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormControl variant="outlined" margin="normal" required fullWidth>
              <InputLabel id="demo-simple-select-outlined-label">Wave Type</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="gentype"
                value={gentype}
                onChange={handleChange}
                label="Wave Type"
              >
                <MenuItem value="Sine-Wave">Sine-Wave</MenuItem>
                <MenuItem value="Square-Wave">Square-Wave</MenuItem>
                <MenuItem value="Triangle-Wave">Triangle-Wave</MenuItem>
                <MenuItem value="Sawtooth-Wave">Sawtooth-Wave</MenuItem>
              </Select>
            </FormControl>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="frequency"
              label="Frequency"
              name="frequency"
              type="number"
              autoComplete="frequency"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="amplitude"
              label="Amplitude"
              type="number"
              id="amplitude"
              autoComplete="amplitude"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Generate Function
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Function Generated Successfully, Please Check Your Email
        </Alert>
      </Snackbar>
          </Box>
        </Box>
      </Container>

      {/* Fourier Series Generator */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            boxShadow: '0px 0px 69px rgba(0, 0, 0, 0.1)',
            marginTop: 8,
            marginBottom: 8,
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Fourier Series Generator Upto nth term (Square Wave Only)
          </Typography>
          <Box component="form" onSubmit={handleSubmitFS} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="n-value"
              label="Value of n (nth term, not more than n=125)"
              name="n-value"
              type="number"
              autoComplete="n-value"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Generate Function
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Function Generated Successfully, Please Check Your Email
        </Alert>
      </Snackbar>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}