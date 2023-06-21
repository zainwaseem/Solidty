import * as React from 'react';
import { useEffect, useState } from "react";
import RequestUpdateContract from '../../contracts/RequestUpdateContract';
import RegisterStudentContract from '../../contracts/RegisterStudentContract';
import {toast } from 'react-toastify';
import Web3 from 'web3';

import { Grid, Button,TextField, InputLabel, Input } from '@mui/material';
import { create } from "ipfs-http-client";
export default function Review({ setActiveStep, activeStep }) {
  const [picture, setPicture] = useState('');
  const [cnicPicture, setCnicPicture] = useState('');
  const [matricDegree, setMatricDegree] = useState('');
  const [interDegree, setInterDegree] = useState('');
  const [regId, setRegId] = useState('');
  const [address1, setAddress1] = useState('');
  const [programCode, setProgramCode] = useState('');
  const [admissionDate, setAdmissionDate] = useState(0);
  const [reason, setReason] = useState('');
  const [selectedPicture, setSelectedPicture] = useState('');
  const [studentData, setStudentData] = useState('');
  const [selectedCnicPicture, setSelectedCnicPicture] = useState('');
  const [selectedMatricDegree, setSelectedMatricDegree] = useState('');
  const [selectedInterDegree, setSelectedInterDegree] = useState('');
  const [address, setAddress] = useState('');
  const [requestUpdateContract, setRequestUpdateContract] = useState(null);
  const projectId = "2NxKo7SWNgVvNoqa3xA31FO9UP4";
  const projectSecret = "16e6d20b020b314b626c9f0ca0ff5df3";
  const authorization = "Basic " + btoa(projectId + ":" + projectSecret);

  const ipfs = create({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: {
      authorization
    }
  });

  
  const fetchData = async () => {
    try {
      const storedAddress = await sessionStorage.getItem('address');
      const web3Instance = await new Web3(window.ethereum);
      const contract = await RequestUpdateContract(web3Instance);
      if (contract) {
        setAddress(storedAddress);
        setRequestUpdateContract(contract);
      const student1 = await contract.methods.getStudentRequestDetails(storedAddress).call({ from: storedAddress });
      if(student1.d_data.stored)
      {
        setActiveStep(activeStep+1); 
      }
      else{
        const contract1 = await RegisterStudentContract(web3Instance);
        const student= await contract1.methods.get_student(storedAddress).call({ from: storedAddress });
        if (student.d_data.stored) {
          setStudentData(student);
          setRegId(student.Id);
          setAddress1(student.addr);
          setProgramCode(student.programCode);
          setAdmissionDate(student.admission_date);
          setPicture(student.d_data.picture);
          setCnicPicture( student.d_data.cnic);
          setMatricDegree(student.d_data.ssc_degree);
          setInterDegree(student.d_data.hssc_degree);
          setSelectedPicture("https://bas.infura-ipfs.io/ipfs/" + student.d_data.picture);
          setSelectedCnicPicture("https://bas.infura-ipfs.io/ipfs/" + student.d_data.cnic);
          setSelectedMatricDegree("https://bas.infura-ipfs.io/ipfs/" + student.d_data.ssc_degree);
          setSelectedInterDegree("https://bas.infura-ipfs.io/ipfs/" + student.d_data.hssc_degree);
        }
      }}
    } catch (err) {
      toast.error("Error Occured: " + err.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);


  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
    setSelectedPicture(URL.createObjectURL(file));
  };

  const handleCnicPictureChange = (event) => {
    const file = event.target.files[0];
    setCnicPicture(file);
    setSelectedCnicPicture(URL.createObjectURL(file));
  };

  const handleMatricDegreeChange = (event) => {
    const file = event.target.files[0];
    setMatricDegree(file);
    setSelectedMatricDegree(URL.createObjectURL(file));
  };

  const handleInterDegreeChange = (event) => {
    const file = event.target.files[0];
    setInterDegree(file);
    setSelectedInterDegree(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let pic1 = '';
  let cnic1 = '';
  let matric1 = '';
  let inter1 = '';

    if(studentData.d_data.picture===picture){
    pic1=picture;
    }
    else{
    const pic = await ipfs.add(picture);
    pic1=pic.path;
  }
  if(studentData.d_data.cnic===cnicPicture){
    cnic1=cnicPicture;
    }
    else{
    const pic = await ipfs.add(cnicPicture);
    cnic1=pic.path;
  }
  if(studentData.d_data.ssc_degree===matricDegree){
    matric1=matricDegree;
    }
    else{
    const pic = await ipfs.add(matricDegree);
    matric1=pic.path;
  }
  if(studentData.d_data.hssc_degree===interDegree){
    inter1=interDegree;
    }
    else{
    const pic = await ipfs.add(interDegree);
    inter1=pic.path;
  }
    try {
      await requestUpdateContract.methods.updateDocumentDetails(regId, address1, programCode, admissionDate, pic1, cnic1, matric1, inter1, reason).send({ from: address });
      toast.success('Document Details Added')
      setActiveStep(activeStep + 1);
    } catch (err) {
      toast.error("Error Occured: " + err.message)
    }
  };


  return (
    <form onSubmit={handleSubmit}>

      <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="upload-photo">Picture</InputLabel>
          <Input
            id="Picture"
            name="uploadphoto"
            type="file"
            onChange={handlePictureChange}
          />
          {selectedPicture && <img src={selectedPicture} alt="Selected Picture" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="upload-photo">CNIC</InputLabel>
          <Input
            id="CnicPicture"
            name="uploadphoto"
            type="file"
            onChange={handleCnicPictureChange}
          />
          {selectedCnicPicture && <img src={selectedCnicPicture} alt="Selected Picture" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="upload-photo">Matric Degree</InputLabel>
          <Input
            id="MatricDegree"
            name="uploadphoto"
            type="file"
            onChange={handleMatricDegreeChange}
          />
          {selectedMatricDegree && <img src={selectedMatricDegree} alt="Selected Picture" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="upload-photo">Inter Degree</InputLabel>
          <Input
            id="upload-photo"
            name="uploadphoto"
            type="file"
            onChange={handleInterDegreeChange}
          />
          {selectedInterDegree && <img src={selectedInterDegree} alt="Selected Picture" style={{ maxWidth: '100%', marginTop: '10px' }} />}
      
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="reason"
            name="reason"
            label="Reason of Update"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={reason}
            onChange={(event) => setReason(event.target.value)}
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '6%', marginLeft: '86%' }}>
        Submit
      </Button>
    </form>
  );
}