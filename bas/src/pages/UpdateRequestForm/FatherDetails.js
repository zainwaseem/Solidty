import * as React from 'react';
import { useEffect , useState } from "react";
import RequestUpdateContract from '../../contracts/RequestUpdateContract';
import RegisterStudentContract from '../../contracts/RegisterStudentContract';
import {toast } from 'react-toastify';
import Web3 from 'web3';
import { Grid,Button, Typography, TextField } from '@mui/material';


export default function FatherDetails({setActiveStep, activeStep}) {
  
  const [name, setname] = useState('');
  const [cnic, setcnic] = useState('');
  const [phone, setphone] = useState('');
  const [ocupation, setocupation] = useState('');
  const [salary, setsalary] = useState('');
  const [address, setAddress] = useState('');
  const [requestUpdateContract, setRequestUpdateContract] = useState(null);
  const fetchData = async () => {
    try {
      const storedAddress = await sessionStorage.getItem('address');
      const web3Instance = await new Web3(window.ethereum);
      const contract = await RequestUpdateContract(web3Instance);
      if (contract) {
        setAddress(storedAddress);
        setRequestUpdateContract(contract);
      const student1 = await contract.methods.getStudentRequestDetails(storedAddress).call({ from: storedAddress });
      if(student1.f_data.stored)
      {
        setActiveStep(activeStep+1); 
      }
      else{
        const contract1 = await RegisterStudentContract(web3Instance);
        const student= await contract1.methods.get_student(storedAddress).call({ from: storedAddress });
        if(student.f_data.stored){
          setname(student.f_data.name);
          setcnic(student.f_data.cnic);
          setphone(student.f_data.phone_no);
          setocupation(student.f_data.ocupation);
          setsalary(student.f_data.salary);
      }
      }}
    } catch (err) {
      console.log("Error Occured: "+err.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await requestUpdateContract.methods.updateFatherDetails(name,cnic,phone,ocupation,salary).send({ from: address })
      toast.success('Father Details Added');
      setActiveStep(activeStep+1);
    } catch (err) {
      toast.error("Error Occured: "+err.message);
    }
   
  };
  if (!requestUpdateContract || !address) {
    return(
      <>
          <div>Loading...</div>
      </>
    )}
  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Father Detail
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="fatherName"
            name="fatherName"
            label="Father name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={name}
            onChange={(event) => setname(event.target.value)}
          />
        </Grid>
        

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cnic"
            name="cnic"
            label="CNIC"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={cnic}
            onChange={(event) => setcnic(event.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone No"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={phone}
            onChange={(event) => setphone(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="ocupation"
            name="ocupation"
            label="Ocupation"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={ocupation}
            onChange={(event) => setocupation(event.target.value)}
          />
        </Grid>
        

        
        <Grid item xs={12} sm={6}>
           <TextField
            required
            id="salary"
            name="salary"
            label="Salary"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={salary}
            onChange={(event) => setsalary(event.target.value)}
          />
        </Grid>
        

        
        
      </Grid>
      <Button type="submit" variant="contained" color="primary"  style={{ marginTop: '6%',marginLeft:'83%' }}>
        Submit
      </Button>
      </form>
  );
}