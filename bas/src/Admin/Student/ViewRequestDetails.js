import React, { useEffect , useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RequestUpdateContract from '../../contracts/RequestUpdateContract';
import RegisterStudentContract from '../../contracts/RegisterStudentContract';
import Web3 from 'web3';

import { Button } from '@mui/material';
function ViewRequestDetails({address,registerStudentContract,requestUpdateContract}) {
    const [student, setStudent] = useState(null);    
    const [student1, setStudent1] = useState(null);    
  const [admsnDate, setAdmsnDate] = useState('');  
  const [admsnDate1, setAdmsnDate1] = useState('');
  
    async function fetchData() {
        const storedAddress = await sessionStorage.getItem('address');
        const web3Instance = await new Web3(window.ethereum);
        const registerStudentContract = await RegisterStudentContract(web3Instance);
        const requestUpdateContract = await RequestUpdateContract(web3Instance);
        if (registerStudentContract && requestUpdateContract) {
        const studentAddr = localStorage.getItem("Student_address");
        const studentData = await registerStudentContract.methods.get_student(studentAddr).call({ from: storedAddress });
        const studentData1 = await requestUpdateContract.methods.getStudentRequestDetails(studentAddr).call({ from: storedAddress });
        setStudent(studentData);
        setStudent1(studentData1);
        const timestamp = studentData.admission_date;
          const date = new Date(timestamp * 1000); 
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;
          setAdmsnDate(formattedDate);
          const timestamp1 = studentData1.admission_date;
          const date1 = new Date(timestamp1 * 1000); 
          const day1 = date1.getDate().toString().padStart(2, '0');
          const month1 = (date1.getMonth() + 1).toString().padStart(2, '0');
          const year1 = date1.getFullYear();
          const formattedDate1= `${day1}-${month1}-${year1}`;
          setAdmsnDate1(formattedDate1);
      }}
    useEffect(() => {   
        fetchData();
      }, []);
      if (!student || !student1) {
        return <div>Loading...</div>;
      }
      const handleView = (address) => {
        localStorage.setItem("Student_address", address);
    } 

    return (
      <div >
 <div className="panel-wrapper">
            <div className="panel_container">
              <div className="panel">
         
      <h1 className="text-center headings">Student Data</h1>
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
          <tr>
                <td>{student.Id}</td>
                <td>{student.s_data.name}</td>
                <td>{student.programCode}</td>
                <td>{admsnDate}</td>

                <td>
                                          <Link to={"/Admin/Student/ViewStudentDetails"} >
                                          <Button  variant="contained"  onClick={() => handleView(student.addr)}>View Details</Button>
                                          </Link>
                                            </td>
              </tr>
      </tbody>
      </table>
      </div></div></div>
      <div className="panel-wrapper">
            <div className="panel_container">
              <div className="panel">
         
      <h1 className="text-center headings">Requested Data</h1>
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
            <tr>
                  <td>{student1.Id}</td>
                  <td>{student1.s_data.name}</td>
                  <td>{student1.programCode}</td>
                  <td>{admsnDate1}</td>

                  <td>
                                            <Link to={"/Admin/Student/ViewRequestedDetails"} >
                                            <Button  variant="contained"  onClick={() => handleView(student.addr)}>View Details</Button>
                                            </Link>
                                              </td>
                </tr>
        </tbody>
        </table>
        </div></div></div>
      </div>
      
    );
  }
  
export default ViewRequestDetails;
