// component
import SvgColor from '../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic_home'),
  },
  {
    title: 'Schedule Admission',
    path: '/Admin/ScheduleAdmissions/ScheduleAdmission',
    icon: icon('ic_schedule'),
  },
  {
    title: 'Programs',
    path: '/Admin/Programs/Programs',
    icon: icon('ic_programs'),
  },
  {
    title: 'Add Student',
    path: '/Admin/Student/AddStudent',
    icon: icon('ic_add'),
  },
  {
    title: 'View Student List',
    path: '/Admin/Student/StudentsList',
    icon: icon('ic_list'),
  },
  {
    title: 'View Requests List',
    path: '/Admin/Student/RequestsList',
    icon: icon('ic_request'),
  },
];

export default navConfig;
