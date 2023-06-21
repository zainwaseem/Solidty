import styles from './UserProfile.module.css';
import { create } from "ipfs-http-client";
import RegisterStudentContract from '../../contracts/RegisterStudentContract';
import {toast } from 'react-toastify';
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
  const [photo, setPhoto] = useState(null);
  const [student, setStudent] = useState(null);
  const [admsnDate, setAdmsnDate] = useState('');
   const [studentAddr, setStudentAddr] = useState(null);
   const inputRef = useRef(null);
   const projectId = "2NxKo7SWNgVvNoqa3xA31FO9UP4";
   const projectSecret = "16e6d20b020b314b626c9f0ca0ff5df3";
   const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
   const [address, setAddress] = useState('');
   const[isRegistered,setRegistered]=useState(false);
 const [registerStudentContract, setRegisterStudentContract] = useState(null);
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
      const contract = await RegisterStudentContract(web3Instance);
      if (contract) {
        setAddress(storedAddress);
        setRegisterStudentContract(contract);
  
        const studentAddr =await localStorage.getItem("Student_address");
        const check= await contract.methods.checkStudent(studentAddr).call({ from: storedAddress });
        if(check){
          const studentData = await contract.methods.get_student(studentAddr).call({ from: address });
          setStudent(studentData);
          const timestamp = studentData.admission_date;
          const date = new Date(timestamp * 1000); 
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          const formattedDate = `${day}-${month}-${year}`;
          setAdmsnDate(formattedDate);
      }}
    } catch (err) {
      console.log("Error Occurred: " + err.message);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
    if(!address){
      return<div>
        Loading.....
      </div>
    }
    if (!student) {
        return <div>
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
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center" className="text-center headings">
            Registration
          </Typography>
          <>
              <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>
              Your Registration is Incomplete
              </Typography>

            </>
        </Paper>
        
      </Container>
    </ThemeProvider>
        </div>;
      }    
      
       return (
        
           <div className={`${styles['user-profile']} d-flex flex-column align-items-center border bg-white`}>
        <label htmlFor="user-profile" className={`${styles['user-profile-label']} ${styles['user-profile-container']}`}>
  <img src={"https://bas.infura-ipfs.io/ipfs/" + student.d_data.picture} alt="student_image" />
  <input type="file" className={`${styles['user-profile-input']} visually-hidden`} id="user-profile" />
</label>
                <h1 className="text-center headings">Student Details</h1>
            <div className="Student">
                <table>
                <tbody>
                <tr>
                        <td ><strong>Registration Id</strong></td>
                        <td colSpan={3}>{student.Id}</td>
                    </tr>
                    
                    <tr>
                        <td ><strong>Account Address</strong></td>
                        <td colSpan={3}>{student.addr}</td>
                        
                    </tr>
                    <tr>
                    <td ><strong>Program Code</strong></td>
                        <td>{student.programCode}</td>
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
                        <td>{student.s_data.name}</td>
                        <td><strong>Last Name</strong></td>
                        <td>{student.s_data.surname}</td>

                    </tr>
                    <tr>
                    <td><strong>Date of birth</strong></td>
                        <td>{student.s_data.date_of_birth}</td>
                        <td><strong>CNIC</strong></td>
                        <td>{student.s_data.cnic}</td>
                       

                    </tr>
                    <tr>
                        <td><strong>Gender</strong></td>
                        <td>{student.s_data.gender}</td>
                        <td><strong>Phone Number</strong></td>
                        <td>{student.s_data.phone_no}</td>                     

                    </tr>
                    <tr>
                        <td ><strong>Email</strong></td>
                        <td colSpan={3}>{student.s_data.email}</td>
                        </tr><tr>
                        <td  ><strong>Permanent Address</strong></td>
                        <td colSpan={3}>{student.s_data.permanent_addr}</td>
                    </tr>
                    <tr>                   
                        <td><strong>City</strong></td>
                        <td>{student.s_data.city}</td>
                        <td><strong>Country</strong></td>
                        <td>{student.s_data.country}</td>

                    </tr>
                  
                    <tr>
                        <td colSpan={4}>
                        <h3 className="text-center headings" >Father Details</h3>
                        </td>
                    </tr>
                    <tr>
                        <td ><strong>Name</strong></td>
                        <td colSpan={3}>{student.f_data.name}</td>
                        </tr>
                    <tr>
                        <td><strong>CNIC</strong></td>
                        <td>{student.f_data.cnic}</td>
                        <td><strong>Phone Number</strong></td>
                        <td>{student.f_data.phone_no}</td>
                        
                        </tr>
                    
                    <tr>
                    <td><strong>Occupation</strong></td>
                        <td>{student.f_data.ocupation}</td>
                        <td><strong>Salary</strong></td>
                        <td>{student.f_data.salary}</td>

                    
                    </tr>

                    <tr>
                        <td colSpan={4}>
                        <h3 className="text-center headings" >Educational Details</h3>
                        </td>
                    </tr>

                    <tr>
                        <td ><strong>Matric Board Name</strong></td>
                        <td colSpan={3}>{student.e_data.ssc_board_name}</td>
                    </tr>

                    <tr>
                        <td><strong>Total Marks</strong></td>
                        <td>{student.e_data.ssc_total_marks}</td>
                        <td><strong>Obtained Marks</strong></td>
                        <td>{student.e_data.ssc_obtained_marks}</td>
                    </tr>

                    <tr>
                        <td ><strong>Inter Board Name</strong></td>
                        <td colSpan={3}>{student.e_data.ssc_board_name}</td>
                    </tr>

                    <tr>
                        <td><strong>Total Marks</strong></td>
                        <td>{student.e_data.hssc_total_marks}</td>
                        <td><strong>Obtained Marks</strong></td>
                        <td>{student.e_data.hssc_obtained_marks}</td>
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
                            src={"https://bas.infura-ipfs.io/ipfs/" + student.d_data.cnic}
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
                            src={"https://bas.infura-ipfs.io/ipfs/" + student.d_data.ssc_degree}
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
                            src={"https://bas.infura-ipfs.io/ipfs/" + student.d_data.hssc_degree}
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