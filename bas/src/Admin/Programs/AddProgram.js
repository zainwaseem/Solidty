import React, { useEffect , useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddProgram.css";
import { toast } from 'react-toastify';
import ProgramContract from '../../contracts/ProgramContract';
import Web3 from 'web3';

import { CssBaseline, AppBar, Box, Container, Toolbar, Paper, Stepper, Step, StepLabel, createTheme, ThemeProvider } from '@mui/material';
import { Grid, Button, Typography, TextField } from '@mui/material';

const theme = createTheme();
export default function AddProgram() {
  const navigate = useNavigate();
  const [programCode, setProgramCode] = useState('')
  const [programName, setProgramName] = useState('')
  const [programType, setProgramType] = useState('')

  const [address, setAddress] = useState('');
  const [programContract, setProgramContract] = useState(null);

  const addProgram = async (event) => {
    event.preventDefault();

    try {
      await programContract.methods.addProgram(programCode, programName,programType).send({ from: address });
      toast.success('Program added');
      console.log("ok");
      navigate("/Admin/Programs/Programs");
    } catch (err) {
      toast.error(err.message)
    }
  }
  const fetchData = async () => {
    try {
      const storedAddress = await sessionStorage.getItem('address');
      const web3Instance = await new Web3(window.ethereum);
      const contract = await ProgramContract(web3Instance);
      if (contract) {
        setAddress(storedAddress);
        setProgramContract(contract);
      }
    } catch (err) {
      console.log("Error Occurred: " + err.message);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: '25px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
          <Typography component="h3" variant="h4" align="center" className="text-center headings">
            Add Program
          </Typography>
          <form onSubmit={addProgram}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="program_code"
                  name="program_code"
                  label="Program Code"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={programCode}
                  onChange={(e) => setProgramCode(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="program_name"
                  name="program_name"
                  label="Program Name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="program_type"
                  name="program_type"
                  label="Program Type"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={programType}
                  onChange={(e) => setProgramType(e.target.value)}
                />
              </Grid>

            </Grid>
            <Button type="submit" variant="contained" color="primary" className="btn-custom" style={{ marginTop: '6%', marginLeft: '83%' }}>
              Submit
            </Button>
          </form>
        </Paper>

      </Container>
    </ThemeProvider>
  )
}

