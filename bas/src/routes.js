import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
import BlogPage from "./pages/statusPage";
import UserPage from "./pages/Registration";
import Page404 from "./pages/Page404";
import ProductsPage from "./pages/UpdatePage";
import DashboardAppPage from "./pages/DashboardAppPage";
import FirstPage from "./firstPage";

import React, { useState} from "react";
// ----------------------------------------------------------------------
import AdminDashboard from './Admin/Dashboard';
import AddProgram from './Admin/Programs/AddProgram';
import EditProgram from './Admin/Programs/EditProgram';
import Programs from './Admin/Programs/Programs';
import ScheduleAdmission from './Admin/ScheduleAdmissions/ScheduleAdmission';
import AddStudent from './Admin/Student/AddStudent';
import StudentsList from './Admin/Student/StudentsList';
import ViewStudentDetails from './Admin/Student/ViewStudentDetails';
import HistoryList from './Admin/Student/HistoryList';
import RequestsList from './Admin/Student/RequestsList';
import ViewRequestDetails from './Admin/Student/ViewRequestDetails';
import Panel from './Admin/Student/viewRequestDetails/Panel';
import ViewHistoryDetails from './Admin/Student/viewHistoryDetails/Panel';
export default function Router() {
  const[address,setAddress]=useState(null);
  const[programContract,setProgramContract]=useState(null); 
  const[scheduleAdmissionContract,setScheduleAdmissionContract]=useState(null); 
  const[registerStudentContract,setRegisterStudentContract]=useState(null); 
  const[requestUpdateContract,setRequestUpdateContract]=useState(null); 
  const[updateStudentContract,setUpdateStudentContract]=useState(null); 
  const[studentHistoryContract,setStudentHistoryContract]=useState(null); 
  const [searchTerm, setSearchTerm] = useState('');

  const routes = useRoutes([
    {
      path: "/",
      element: <FirstPage setAddress={setAddress} setProgramContract={setProgramContract} setScheduleAdmissionContract={setScheduleAdmissionContract} setRegisterStudentContract={setRegisterStudentContract} setRequestUpdateContract={setRequestUpdateContract} setUpdateStudentContract={setUpdateStudentContract} setStudentHistoryContract={setStudentHistoryContract}/>,
      index: true, 
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage  address={address} registerStudentContract={registerStudentContract}/> },
        { path: "user", element: <UserPage address={address} registerStudentContract={registerStudentContract}/> },
        { path: "products", element: <ProductsPage address={address} registerStudentContract={registerStudentContract} requestUpdateContract={requestUpdateContract} /> },
        { path: "blog", element: <BlogPage address={address} requestUpdateContract={requestUpdateContract}/> },
      ],
    },
    {
      path: '/Admin',
      element: <AdminDashboard setSearchTerm={setSearchTerm}/>,
      children: [
        { element: <Navigate to="/Admin/Programs/Programs" />, index: true },
        { path: 'Programs/Programs', element: <Programs searchTerm={searchTerm}/> },
        { path: 'Programs/AddProgram', element: <AddProgram  address={address}  programContract={programContract}/> },
        { path: 'Programs/EditProgram', element: <EditProgram  address={address}  programContract={programContract}/> },
        { path: 'ScheduleAdmissions/ScheduleAdmission', element: <ScheduleAdmission  address={address}  scheduleAdmissionContract={scheduleAdmissionContract}/> },
        { path: 'Student/AddStudent', element: <AddStudent  address={address}  registerStudentContract={registerStudentContract}/> },
        { path: 'Student/StudentsList', element: <StudentsList searchTerm={searchTerm}/> },
        { path: 'Student/ViewStudentDetails', element: <DashboardAppPage /> },
        { path: 'Student/HistoryList', element: <HistoryList  address={address}  studentHistoryContract={studentHistoryContract}/> },
        { path: 'Student/RequestsList', element: <RequestsList searchTerm={searchTerm}/> },
        { path: 'Student/ViewRequestDetails', element: <ViewRequestDetails  address={address}  registerStudentContract={registerStudentContract} requestUpdateContract={requestUpdateContract}/> },
        { path: 'Student/ViewRequestedDetails', element: <Panel /> },
        { path: 'Student/ViewHistoryDetails', element: <ViewHistoryDetails /> },

      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
