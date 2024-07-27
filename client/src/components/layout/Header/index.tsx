import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const Header: React.FC = () =>
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar />
    </AppBar>
  </Box>
export default Header
