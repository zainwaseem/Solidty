import * as React from 'react';
import {CssBaseline, AppBar,Box, Container,Toolbar,Paper,Stepper, Step,StepLabel,
        Button,Link,Typography,createTheme,ThemeProvider} from '@mui/material';
import { useEffect , useState } from "react";
import RequestUpdateContract from '../contracts/RequestUpdateContract';
import RegisterStudentContract from '../contracts/RegisterStudentContract';
import {toast } from 'react-toastify';
import Web3 from 'web3';
const theme = createTheme();

export default function StatusPage() {
  const [status, setStatus] = useState('You have no Update Request');
  const [comments, setComments] = useState('');
  const fetchData = async () => {
    try {
      const storedAddress = await sessionStorage.getItem('address');
      const web3Instance = await new Web3(window.ethereum);
      const contract = await RequestUpdateContract(web3Instance);
      if (contract) {
      const st = await contract.methods.getStatus(storedAddress).call({ from: storedAddress });
      if(st[0]==""){
        setStatus("You have no Update Request");
      }
      else if(st[0]==="Pending"){
        setStatus("Your Update Request is Pending");
      }
      else{
        setStatus("Your Last Update Request was "+st[0]);
        setComments("Administrator Comments: "+st[1]);
      }}
    } catch (err) {
      console.log("Error Occured: "+err.message);
    }
  }
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
        <Paper  variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: '25px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
          <Typography component="h1" variant="h4" align="center"  className="text-center headings">
            Staus of Update Request 
          </Typography>
          <>
              <Typography variant="h7" gutterBottom style={{ textAlign: 'center',marginLeft:"25%" }}>
                {status}
              </Typography>
              <Typography variant="subtitle1">
                {comments}
              </Typography>
            </>
        </Paper>
        
      </Container>
    </ThemeProvider>
  );
}
