import React, { useEffect , useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RequestUpdateContract from '../../contracts/RequestUpdateContract';
import {toast } from 'react-toastify';
import Web3 from 'web3';

import { Button } from '@mui/material';
import '../../pages/viewStudentDetail/panel.css';
function RequestsList({searchTerm}) {
  
    const [students, setStudents] = useState([]);
    const [admsnDate, setAdmsnDate] = useState('');

    const fetchData = async () => {
      try {
        const storedAddress = await sessionStorage.getItem('address');
        const web3Instance = await new Web3(window.ethereum);
        const contract = await RequestUpdateContract(web3Instance);
        if (contract) {
        const studentsArr = await contract.methods.getPendingQueue().call({ from: storedAddress });
        setStudents(studentsArr);
        studentsArr.map((student) => {
          const timestamp = student.admission_date;
          const date = new Date(timestamp * 1000); 
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;
          setAdmsnDate(formattedDate);
        });
      } }catch (err) {
        toast.error("Error Occured: "+err.message)
      }
    }
    
    useEffect(() => {
      fetchData();
    }, []);  

    
  const handleView = (address) => {
    localStorage.setItem("Student_address", address);
}

const filteredStudents = students.filter((student) =>
student.Id.toLowerCase().includes(searchTerm.toLowerCase())
);
    return (
      <div className="panel-wrapper">
      <div className="panel_container">
        <div className="panel">
   
        <h1 className="text-center headings">Requests List</h1>
        <table >
          <thead>
            <tr>
              <td><strong>Registration ID</strong></td>
              <td><strong>Student Name</strong></td>
              <td><strong>Program Code</strong></td>
              <td><strong>Admission Date</strong></td>
              <td><strong>View Details</strong></td>
            </tr>
          </thead>
          <tbody>
          {searchTerm === "" // check if search bar is empty
            ? students.map((student) => (
                <tr key={student.Id}>
                  <td>{student.Id}</td>
                  <td>{student.s_data.name}</td>
                  <td>{student.programCode}</td>
                  <td>{admsnDate}</td>
                  <td>
                                            <Link to={"/Admin/Student/ViewRequestDetails"} >
                                            <Button  variant="contained" onClick={() => handleView(student.addr)}>View Details</Button>
                                            </Link>
                                              </td>
                </tr>
              ))
            : filteredStudents.map((student) => (
                <tr key={student.Id}>
                  <td>{student.Id}</td>
                  <td>{student.s_data.name}</td>
                  <td>{student.programCode}</td>
                  <td>{admsnDate}</td>
                  <td>
                                            <Link to={"/Admin/Student/ViewRequestDetails"} >
                                            <Button  variant="contained" onClick={() => handleView(student.addr)}>View</Button>
                                            </Link>
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
  
export default RequestsList;
