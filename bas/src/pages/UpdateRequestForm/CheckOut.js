import * as React from 'react';
import {CssBaseline, AppBar,Box, Container,Toolbar,Paper,Stepper, Step,StepLabel,
        Button,Link,Typography,createTheme,ThemeProvider} from '@mui/material';
import PersonalDetails from './PersonalDetails';
import Academicdetails from './Academicdetails';

import RegisterStudentContract from '../../contracts/RegisterStudentContract';
import {toast } from 'react-toastify';
import Web3 from 'web3';
import Review from './DocumentDetails';
import FatherDetails from './FatherDetails';
import { useEffect , useState } from "react";

const theme = createTheme();

export default function Checkout({requestUpdateContract}) {
    const [activeStep, setActiveStep] = React.useState(-1);
  const steps = ['Personal Details','Father Details' ,'Academics Deatils', 'Documents'];
  const [address, setAddress] = useState('');
  const [registerStudentContract, setRegisterStudentContract] = useState(null);
  const fetchData = async () => {
    try {
      const storedAddress = await sessionStorage.getItem('address');
      const web3Instance = await new Web3(window.ethereum);
      const contract = await RegisterStudentContract(web3Instance);
      if (contract) {
        setAddress(storedAddress);
        setRegisterStudentContract(contract);
        const student = await contract.methods.checkStudent(storedAddress).call({ from: storedAddress });
        if (student) {
        setActiveStep(activeStep+1);
      }}
    } catch (err) {
      console.log("Error Occured: "+err.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []); 

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <PersonalDetails address={address} registerStudentContract={registerStudentContract} requestUpdateContract={requestUpdateContract} setActiveStep={setActiveStep} activeStep={activeStep}/>;
      case 1:
        return <FatherDetails address={address} registerStudentContract={registerStudentContract} requestUpdateContract={requestUpdateContract} setActiveStep={setActiveStep} activeStep={activeStep}/>;
      case 2:
        return <Academicdetails address={address} registerStudentContract={registerStudentContract} requestUpdateContract={requestUpdateContract} setActiveStep={setActiveStep} activeStep={activeStep}/>;
      case 3:
          return <Review address={address} registerStudentContract={registerStudentContract} requestUpdateContract={requestUpdateContract} setActiveStep={setActiveStep} activeStep={activeStep}/>;
      default:
        throw new Error('Unknown step');
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
      <Paper  variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: '25px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
          <Typography component="h1" variant="h4" align="center" className="text-center headings">
            Update Request Form
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>      
          {activeStep === -1 ? (
            <>
              <Typography variant="h5" gutterBottom>
                Your Registration is Incomplete
              </Typography>
              <Typography variant="subtitle1">
               First register yourself then you can send update request to the admisnistrator for approval
              </Typography>
            </>
          ):(activeStep === steps.length ? (
            <>
              <Typography variant="h5" gutterBottom>
                Request for update Submitted
              </Typography>
              <Typography variant="subtitle1">
                To check your status of approval. Go to Status Page
              </Typography>
            </>
          ) : (
            <>
              {getStepContent(activeStep)}
              
            </>
          ))}
        </Paper>
        
      </Container>
    </ThemeProvider>
  );
}