import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';

function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            color: '#fff', 
            fontFamily: '"Poppins", sans-serif', // UPDATED FONT
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <SportsFootballIcon /> 
          <SportsBasketballIcon /> 
          <SportsBaseballIcon />
          <SportsGolfIcon />
          <Box component="span" sx={{ ml: 1.5 }}>
            draftBalls
          </Box>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;