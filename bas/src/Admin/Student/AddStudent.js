import React, { useState } from "react";

import RegisterStudentContract from '../../contracts/RegisterStudentContract';
import {toast } from 'react-toastify';
import Web3 from 'web3';
import "./AddStudent.css"

import { CssBaseline, AppBar, Box, Container, Toolbar, Paper, Stepper, Step, StepLabel, createTheme, ThemeProvider } from '@mui/material';
import { Grid, Button, Typography, TextField } from '@mui/material';

const theme = createTheme();
function AddStudent() {
  const [regId, setRegId] = useState('');
  const [address1, setAddress1] = useState('');
  const [programCode, setProgramCode] = useState('');
  const addStudent = async (event) => {
    event.preventDefault(); 
    try {
      const storedAddress = await sessionStorage.getItem('address');
      const web3Instance = await new Web3(window.ethereum);
      const contract = await RegisterStudentContract(web3Instance);
      if (contract) {
      await contract.methods.add_student(regId, address1, programCode).send({ from: storedAddress });
      toast.success('Student added successfully');}
    } catch (err) {
      toast.error("Error Occured: "+err.message);
    }
  }
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
            Add Student
          </Typography>
          <form onSubmit={addStudent}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="registration_Id"
                  name="registration_Id"
                  label="Registration Id"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={regId}
                  onChange={(e) => setRegId(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="account_address"
                  name="account_address"
                  label="Account Address"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="program_code"
                  name="Program_code"
                  label="Program Code"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                  value={programCode}
                  onChange={(e) => setProgramCode(e.target.value)}
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
export default AddStudent;
