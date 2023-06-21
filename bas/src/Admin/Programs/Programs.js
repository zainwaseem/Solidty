import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import '../../pages/viewStudentDetail/panel.css';
import { Button } from '@mui/material';
import ProgramContract from '../../contracts/ProgramContract';
import Web3 from 'web3';
function Programs({searchTerm}) {
  const [programs, setPrograms] = useState([]);
  const [address, setAddress] = useState('');
  const [programContract, setProgramContract] = useState(null);
  const fetchData = async () => {
    try {
      const storedAddress = await sessionStorage.getItem('address');
      const web3Instance = await new Web3(window.ethereum);
      const contract = await ProgramContract(web3Instance);
      if (contract) {
        setAddress(storedAddress);
        setProgramContract(contract);
  
      const programsArr = await contract.methods.getProgramList().call({ from: storedAddress });
      setPrograms(programsArr);}
    } catch (err) {
      toast.error('Error occurred: ' + err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (Program_Code, Program_Name, Program_Type) => {
    localStorage.setItem("Program_Code", Program_Code);
    localStorage.setItem("Program_Name", Program_Name);
    localStorage.setItem("Program_Type", Program_Type);

  }


  const handleDelete = async (pCode) => {
    try {
      await programContract.methods.deleteProgram(pCode).send({ from: address })
      toast.success('Program deleted successsfully')
      fetchData();
    } catch (err) {
      toast.error('Error occurred: ' + err.message);
    }
  }


  const filteredPrograms = programs.filter((program) =>
    program.programName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (!programContract || !address) {
    return(
      <>
          <div>Loading...</div>
      </>
    )}

  return (
<div className="panel-wrapper">
            <div className="panel_container">
              <div className="panel">
                
      <h1 className="text-center headings">Programs</h1>
      <table >
        <thead>
          <tr>
            <td><strong>Code</strong></td>
            <td colSpan={2}><strong>Name</strong></td>
            <td><strong>Type</strong></td>
            <td><strong>Edit/Delete</strong></td>
          </tr>
        </thead>
        <tbody>
          {searchTerm === "" ?
            programs.map((program) => (
                  <tr key={program.programCode}>
                    <td>{program.programCode}</td>
                    <td colSpan={2}>{program.programName}</td>
                    <td>{program.programType}</td>
                    <td>
                      <Link to={"/Admin/Programs/EditProgram"} >
                      <Button  variant="contained" onClick={() => handleEdit(program.programCode, program.programName, program.programType)}>Edit</Button>
                      </Link>
                      &nbsp;
                      <Button  variant="contained" onClick={() => handleDelete(program.programCode)}>Delete</Button>
                    </td>
                  </tr>
            ))
            :filteredPrograms.map((program) => (
                  <tr key={program.programCode}>
                    <td>{program.programCode}</td>
                    <td colSpan={2}>{program.programName}</td>
                    <td>{program.programType}</td>
                    <td>
                      <Link to={"/Admin/Programs/EditProgram"} >
                      <Button  variant="contained" onClick={() => handleEdit(program.programCode, program.programName, program.programType)}>Edit</Button>
                      </Link>
                      &nbsp;
                      <Button  variant="contained" onClick={() => handleDelete(program.programCode)}>Delete</Button>
                    </td>
                  </tr>
            ))}
        </tbody>
      </table>
      
      </div>
            </div>
          </div>

  );
}

export default Programs;
