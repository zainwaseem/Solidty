// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_home'),
  },
  {
    title: 'Registration',
    path: '/dashboard/user',
    icon: icon('ic_list'),
  },
  {
    title: 'Update Record',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'Status',
    path: '/dashboard/blog',
    icon: icon('ic_status'),
  },
];

export default navConfig;
