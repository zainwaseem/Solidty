import styles from './UserProfile.module.css';
import { create } from "ipfs-http-client";
import RequestUpdateContract from '../../../contracts/RequestUpdateContract';
import UpdateStudentContract from '../../../contracts/UpdateStudentContract';
import {toast } from 'react-toastify';
import { Grid, TextField } from '@mui/material';

import { useNavigate } from "react-router-dom";
import { Form } from 'react-bootstrap';
import Web3 from 'web3';
import React, { useEffect ,useState, useRef } from "react";
import {CssBaseline, AppBar,Box, Container,Toolbar,Paper,Stepper, Step,StepLabel,
    Button,Link,Typography,createTheme,ThemeProvider} from '@mui/material';
import './userprofile.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import userProfile from './Arash.jpg';
const theme = createTheme();

const UserInformation = () => {
    let history = useNavigate();
  const [photo, setPhoto] = useState(null);
  const [student, setStudent] = useState(null);
  const [admsnDate, setAdmsnDate] = useState('');
   const [studentAddr, setStudentAddr] = useState(null);
   const [reason, setReason] = useState('');
   const [reason1, setReason1] = useState([]);
   const handleReasonChange = (event) => {
       setReason(event.target.value);
   }
   const inputRef = useRef(null);
   const projectId = "2NxKo7SWNgVvNoqa3xA31FO9UP4";
   const projectSecret = "16e6d20b020b314b626c9f0ca0ff5df3";
   const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
   const [address, setAddress] = useState('');
 const [updateStudentContract, setUpdateStudentContract] = useState(null);
   const ipfs = create({
     url: "https://ipfs.infura.io:5001/api/v0",
     headers: {
       authorization
     }
   });
  const fetchData = async () => {
    try {
      const studentData =await localStorage.getItem("Student");
          if (studentData) {
            const studentArray = studentData.split(",");
            setStudent(studentArray);
          const timestamp = studentArray[3];
          const date = new Date(timestamp * 1000); 
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;
          setAdmsnDate(formattedDate);
      }
    } catch (err) {
      console.log("Error Occurred: " + err.message);
    }
  };
  const handleApproval = async() => {
    try {    
      await updateStudentContract.methods.Approval(student.addr,true,reason).send({ from: address });    
      toast.success('Request Approved Successfully');
      history("/Admin/Student/StudentsList");
    } catch (err) {
        toast.error("Error Occured: "+err.message);
    }
}
const handleDisapproval = async() => {
    try {
      await updateStudentContract.methods.Approval(student.addr,false,reason).send({ from: address });
      toast.success('Request Rejected successfully');
      history("/Admin/Student/StudentsList");
    } catch (err) {
     toast.error("Error Occured: "+err.message);
    }
}
  useEffect(() => {
    fetchData();
  }, []);
    if (!student) {
        return <div>
 Loading...........
        </div>;
      }    
      
       return (
        
           <div className={`${styles['user-profile']} d-flex flex-column align-items-center border bg-white`}>
        <label htmlFor="user-profile" className={`${styles['user-profile-label']} ${styles['user-profile-container']}`}>
  <img src={"https://bas.infura-ipfs.io/ipfs/" +student[4]} alt="student_image" />
  <input type="file" className={`${styles['user-profile-input']} visually-hidden`} id="user-profile" />
</label>
                <h1 className="text-center headings">Student Details</h1>
            <div className="Student">
                <table>
                <tbody>
                <tr>
                        <td ><strong>Registration Id</strong></td>
                        <td colSpan={3}>{student[0]}</td>
                    </tr>
                    
                    <tr>
                        <td ><strong>Account Address</strong></td>
                        <td colSpan={3}>{student[1]}</td>
                        
                    </tr>
                    <tr>
                    <td ><strong>Program Code</strong></td>
                        <td>{student[2]}</td>
                    <td><strong>Admission Date</strong></td>
                        <td >{admsnDate}</td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                            <h3 className="text-center headings" >Personal Details</h3>
                        </td>
                    </tr>
                    <tr>

                        <td><strong>First Name</strong></td>
                        <td>{student[9]}</td>
                        <td><strong>Last Name</strong></td>
                        <td>{student[10]}</td>

                    </tr>
                    <tr>
                    <td><strong>Date of birth</strong></td>
                        <td>{student[11]}</td>
                        <td><strong>CNIC</strong></td>
                        <td>{student[12]}</td>
                       

                    </tr>
                    <tr>
                        <td><strong>Gender</strong></td>
                        <td>{student[13]}</td>
                        <td><strong>Phone Number</strong></td>
                        <td>{student[14]}</td>                     

                    </tr>
                    <tr>
                        <td ><strong>Email</strong></td>
                        <td colSpan={3}>{student[15]}</td>
                        </tr><tr>
                        <td  ><strong>Permanent Address</strong></td>
                        <td colSpan={3}>{student[16]}</td>
                    </tr>
                    <tr>                   
                        <td><strong>City</strong></td>
                        <td>{student[17]}</td>
                        <td><strong>Country</strong></td>
                        <td>{student[18]}</td>

                    </tr>
                  
                    <tr>
                        <td colSpan={4}>
                        <h3 className="text-center headings" >Father Details</h3>
                        </td>
                    </tr>
                    <tr>
                        <td ><strong>Name</strong></td>
                        <td colSpan={3}>{student[20]}</td>
                        </tr>
                    <tr>
                        <td><strong>CNIC</strong></td>
                        <td>{student[21]}</td>
                        <td><strong>Phone Number</strong></td>
                        <td>{student[22]}</td>
                        
                        </tr>
                    
                    <tr>
                    <td><strong>Occupation</strong></td>
                        <td>{student[23]}</td>
                        <td><strong>Salary</strong></td>
                        <td>{student[24]}</td>

                    
                    </tr>

                    <tr>
                        <td colSpan={4}>
                        <h3 className="text-center headings" >Educational Details</h3>
                        </td>
                    </tr>

                    <tr>
                        <td ><strong>Matric Board Name</strong></td>
                        <td colSpan={3}>{student[26]}</td>
                    </tr>

                    <tr>
                        <td><strong>Total Marks</strong></td>
                        <td>{student[27]}</td>
                        <td><strong>Obtained Marks</strong></td>
                        <td>{student[28]}</td>
                    </tr>

                    <tr>
                        <td ><strong>Inter Board Name</strong></td>
                        <td colSpan={3}>{student[29]}</td>
                    </tr>

                    <tr>
                        <td><strong>Total Marks</strong></td>
                        <td>{student[30]}</td>
                        <td><strong>Obtained Marks</strong></td>
                        <td>{student[31]}</td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                        <h3 className="text-center headings" > Document Details</h3>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}  className="text-center">
                        <strong style={{textAlign:"center"}}>CNIC/B-Form Document</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                        {ipfs && (
                        <img
                            src={"https://bas.infura-ipfs.io/ipfs/" +  student[5]}
                            alt="Passport Size Photo"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    )} 
                        </td>
                        
                    </tr>
                    <tr>
                        <td colSpan={4} className="text-center">
                            <strong >Matric Document</strong>
                        </td>
                        
                    </tr>
                    <tr>
                        <td colSpan={4}>
                        {ipfs && (
                        <img
                            src={"https://bas.infura-ipfs.io/ipfs/" + student[6]}
                            alt="Passport Size Photo"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    )} 
                        </td>
                        
                    </tr>
                    <tr>
                        <td colSpan={4} className="text-center">
                        <strong >Intermediate Document</strong>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={4}>
                        {ipfs && (
                        <img
                            src={"https://bas.infura-ipfs.io/ipfs/" + student[7]}
                            alt="Passport Size Photo"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    )} 
                        </td>
                        
                    </tr>    
      
    
                   
</tbody>
                </table>
            </div>
            </div>
    )
}


export default UserInformation