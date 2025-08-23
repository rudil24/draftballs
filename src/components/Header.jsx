import React from "react";
// MUI Components for structure and styling
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

// Corrected MUI Icon Imports
import SportsFootballIcon from '@mui/icons-material/SportsFootball';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsBaseballIcon from '@mui/icons-material/SportsBaseball';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';

function Header() {
  return (
    // AppBar provides the themed background, shadow, and responsive padding.
    // color="primary" will use the indigo from your theme.
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography 
          variant="h5" 
          component="h1" 
          sx={{ 
            // Replicates the styles from Header.css
            color: '#fff', 
            fontFamily: "'McLaren', cursive", // Ensure this font is linked in your main index.html
            fontWeight: 200,
            display: 'flex',
            alignItems: 'center',
            gap: 1 // Adds a little space between icons and text
          }}
        >
          <SportsFootballIcon /> 
          <SportsBasketballIcon /> 
          <SportsBaseballIcon />
          <SportsGolfIcon />
          <Box component="span" sx={{ ml: 1.5 }}> {/* Adds extra space before the text */}
            draftBalls
          </Box>
          <SportsGolfIcon />
          <SportsBaseballIcon />
          <SportsBasketballIcon /> 
          <SportsFootballIcon /> 
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;