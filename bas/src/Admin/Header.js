import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { bgBlur } from '../utils/cssStyles';
import Iconify from '../components/iconify';
import Searchbar from './Programs/Searchbar';

import { Button } from '@mui/material';

import { Link } from "react-router-dom";
const NAV_WIDTH = 280;
const HEADER_MOBILE = 64;
const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav, setSearchTerm }) {
  const location = useLocation();
  const isProgramsPage = location.pathname === '/Admin/Programs/Programs';
  const isStudentListPage = location.pathname === '/Admin/Student/StudentsList' ;
  const isRequestListPage = location.pathname === '/Admin/Student/RequestsList' ;
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
        {(isProgramsPage || isStudentListPage ||isRequestListPage) ? (
          <>
            <Searchbar setSearchTerm={setSearchTerm} />
          </>
        ) : (
          <Typography variant="h3" align="center" style={{ color: '#1F2C6D' }}>
            Blockchain Based Admission System
          </Typography>
        )}
        {isProgramsPage ?(
          <>
             <Box sx={{ flexGrow: 1 }} />
             <Stack
               direction="row"
               alignItems="center"
               spacing={{
                 xs: 0.5,
                 sm: 1,
               }}
             >
               <Link to="/Admin/Programs/AddProgram"><Button variant="contained" >Add Program</Button> </Link>
 
 
             </Stack>
             </>
        ):( <></>)}
      </StyledToolbar>
    </StyledRoot>
  );
}
