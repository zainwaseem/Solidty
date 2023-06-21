import * as React from 'react';
import { useEffect , useState } from "react";
import RegisterStudentContract from '../../contracts/RegisterStudentContract';
import {toast } from 'react-toastify';
import Web3 from 'web3';
import { Grid, Button, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


export default function PersonalDetails({setActiveStep, activeStep}) {
  const [name, setname] = useState('');
  const [surname, setsurname] = useState('');
  const [dateofbirth, setdateofbirth] = useState('');
  const [cnic, setcnic] = useState('');
  const [gender, setgender] = useState('');
  const [phoneno, setphoneno] = useState('');  
  const [email, setemail] = useState('');
  const [permanentaddr, setpermanentaddr] = useState('');
  const [city, setcity] = useState('');
  const [country, setcountry] = useState('');
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
  
        const student = await contract.methods.get_student(storedAddress).call({ from: storedAddress });
        if (student.s_data.stored) {
        setActiveStep(activeStep + 1);
        }
      }
    } catch (err) {
      console.log("Error Occurred: " + err.message);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []); 
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await registerStudentContract.methods.PersonalDetails(name, surname,dateofbirth,cnic, gender,phoneno,email,permanentaddr,city,country).send({ from: address })
      toast.success('Personal Details Added');
      setActiveStep(activeStep+1);
    } catch (err) {
      toast.error("Error Occured: "+err.message);
    }
   
  };
  if (!registerStudentContract || !address) {
  return(
    <>
        <div>Loading...</div>
    </>
  )}

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Personal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
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
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={surname}
            onChange={(event) => setsurname(event.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="dob"
            name="dob"
            label="Date of Birth: dd-mm-yyyy"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={dateofbirth}
            onChange={(event) => setdateofbirth(event.target.value)}
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

          <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">Gender</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={gender}
              onChange={(event) => setgender(event.target.value)}
              label="gender"
            >
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>female</MenuItem>
              <MenuItem value={'Others'}>Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="phone_no"
            name="phone_no"
            label="Phone Number"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={phoneno}
            onChange={(event) => setphoneno(event.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="Email Address"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={email}
            onChange={(event) => setemail(event.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="permanent_addr"
            name="permanent_addr"
            label="Address"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={permanentaddr}
            onChange={(event) => setpermanentaddr(event.target.value)}
          />
        </Grid>
   

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={city}
            onChange={(event) => setcity(event.target.value)}
            style={{ marginTop: '8px' }} />
        </Grid>

       
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={country}
            onChange={(event) => setcountry(event.target.value)}
          />
        </Grid>
       

      </Grid>

      <Button type="submit" variant="contained" color="primary" className="btn-custom"  style={{ marginTop: '6%',marginLeft:'83%' }}>
        Submit
      </Button>
      
    </form>
  );
}