import React from 'react';
import { useNavigate } from 'react-router-dom';

import { AppBar, Toolbar, IconButton, Button, Tooltip } from '@mui/material';
import { CalendarMonthRounded, MenuBookRounded, NotificationsNoneRounded, MailOutlineRounded, LogoutRounded } from '@mui/icons-material';
import '../styles/customAppBar.css';

const CustomAppBar = ({ selectedPage }) => {
  const navigate = useNavigate();

  const navItemsLeft = [
    { text: 'Dashboard', icon: <CalendarMonthRounded />, path: '/dashboardEMP' },
    { text: 'Courses', icon: <MenuBookRounded />, path: '/courses' },
  ];

  const navItemsRight = [
    { text: 'Notification', icon: <NotificationsNoneRounded /> },
    { text: 'example@gmail.com', icon: <MailOutlineRounded /> },
    { text: 'Signout', icon: <LogoutRounded />, action: () => handleSignout() },
  ];

  const handleNavigation = (path) => path && navigate(path);

  const handleSignout = () => {
    console.log('User signed out');
    navigate('/');
  };

  const renderNavButton = ({ text, icon, path }, index) => (
    <div className='nav-button-container' key={index}>
      <Button
        color={'white'}
        onClick={() => handleNavigation(path)}
        startIcon={icon}
        className={`nav-button ${selectedPage === index ? 'active' : ''}`}
      >
        {text}
      </Button>
    </div>
  );

  const renderIconButton = ({ text, icon, action }, index) => (
    <Tooltip key={index} title={text}>
      <IconButton className="icon-button" color="inherit" onClick={action}>
        {icon}
      </IconButton>
    </Tooltip>
  );

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <div className="toolbar-container">
          {navItemsLeft.map(renderNavButton)}
        </div>
        <div>
          {navItemsRight.map(renderIconButton)}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
