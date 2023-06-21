import React, {useState, useEffect} from "react";
import { Table, Form } from "react-bootstrap";
import{Link, useNavigate} from "react-router-dom";
import {toast } from 'react-toastify';
import { Button } from '@mui/material';
import ProgramContract from '../../contracts/ProgramContract';
import { CssBaseline, AppBar, Box, Container, Toolbar, Paper, Stepper, Step, StepLabel, createTheme, ThemeProvider } from '@mui/material';
import { Grid, Typography, TextField } from '@mui/material';
import Web3 from 'web3';
const theme = createTheme();

function EditProgram(){
    const [programCode, setProgramCode] = useState('')
    const [programName, setProgramName] = useState('')
    const [programType, setProgramType] = useState('')
  
    const [address, setAddress] = useState('');
    const [programContract, setProgramContract] = useState(null);
  
    let history = useNavigate();

    const handleSubmit=  async(e) =>{
        e.preventDefault();
        try {
            const storedAddress = await sessionStorage.getItem('address');
      const web3Instance = await new Web3(window.ethereum);
      const programContract = await ProgramContract(web3Instance);
      if (programContract) {
        setAddress(storedAddress);
        setProgramContract(programContract);
            await programContract.methods.editProgram(localStorage.getItem("Program_Code"),programCode, programName, programType).send({ from: storedAddress })
            toast.success('Program edit successsfully');
            history("/Admin/Programs/Programs");
          } }catch (err) {
            toast.error("error occured:" +err.message);
          }
    }

    useEffect(()=>{
        setProgramCode(localStorage.getItem("Program_Code"))
        setProgramName(localStorage.getItem("Program_Name"))
        setProgramType(localStorage.getItem("Program_Type"))
    },[])

    return(
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
              Edit Program
            </Typography>
            <form onSubmit={handleSubmit}>
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

export default EditProgram;