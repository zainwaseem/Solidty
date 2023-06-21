import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock

// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Scrollbar from '../components/scrollbar';
import NavSection from '../components/nav-section';
//
import logo from "../logo.jpg";
import navConfig from './SideBar';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;



// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
        color: 'white',
      }}
    >
<Box sx={{ display: 'flex', alignItems: 'center' }}>
  <img
    className="navbar-brand page-scroll"
    src={logo}
    alt="Logo"
    style={{ maxWidth: '25%', paddingLeft: '2%', marginBottom: '10%' }} // Set the desired styles for the logo
  />
  <div>
    <h1 style={{ marginLeft: '3px',marginTop:'-20%'}}>Foundation</h1>
    <h1 style={{ marginLeft: '3px', marginTop:'-20%'}}>University</h1>
  </div>
</Box>
      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: '#1F2C6D',
              borderRightStyle: 'dashed',
              color: 'white', // Set the text color to white
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: '#1F2C6D',
              borderRightStyle: 'dashed',
              color: 'white', // Set the text color to white
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
