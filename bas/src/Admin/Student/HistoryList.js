import React, { useEffect , useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './viewRequestDetails/userprofile.css';

import {CssBaseline, AppBar,Box, Container,Toolbar,Paper,Stepper, Step,StepLabel,
  Button,Typography,createTheme,ThemeProvider} from '@mui/material';
import StudentHistoryContract from '../../contracts/StudentHistoryContract';
import {toast } from 'react-toastify';
import Web3 from 'web3';
const theme = createTheme();

function HistoryList() {
    const [students, setStudents] = useState([]);
    const [admsnDate, setAdmsnDate] = useState('');

    const fetchData = async () => {
      try {
        const studentAddr = localStorage.getItem("Student_address");
        const storedAddress = await sessionStorage.getItem('address');
        const web3Instance = await new Web3(window.ethereum);
        const studentHistoryContract = await StudentHistoryContract(web3Instance);
        const studentsArr = await studentHistoryContract.methods.getHistory(studentAddr).call({ from: storedAddress });
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
      } catch (err) {
        toast.error("Error Occured: "+err.message)
      }
    }
    
    useEffect(() => {
      fetchData();
    }, []);  
    
  const handleView = (stu) => {
    localStorage.setItem("Student", stu);
}
if(students.length==0){
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
    <Paper   variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: '25px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)' }}>
      <Typography component="h1" variant="h4" align="center">
        Student Update History
      </Typography>
      <>
      <Typography variant="h8" gutterBottom style={{ textAlign: 'center' ,marginLeft:"20%"}}>
  This student has no update history
</Typography>


        </>
    </Paper>
    
  </Container>
</ThemeProvider>
    </div>;
}
    return (
      <div className="panel-wrapper">
      <div className="panel_container">
        <div className="panel">
   
        <h1 className="text-center headings">Student History</h1>
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
          {students.map((student) => (
                <tr key={student.Id}>
                  <td>{student.Id}</td>
                  <td>{student.s_data.name}</td>
                  <td>{student.programCode}</td>
                  <td>{admsnDate}</td>
                  <td>
                                            <Link to={"/Admin/Student/ViewHistoryDetails"} >
                                            <Button  variant="contained"  onClick={() => handleView(student)}>View Details</Button>
                                            </Link>
                                              </td>
                </tr>
              ))
            }
        </tbody>
        </table>
        
      </div>
      </div>
      </div>
      
    );
  }
  
export default HistoryList;
