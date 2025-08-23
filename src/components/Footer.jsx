import React from "react";
import { Box, Typography } from "@mui/material";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{
        // Replicates the styles from Footer.css
        textAlign: 'center',
        py: 2, // Use theme-aware padding
        mt: 4, // Add some margin top to separate from content
      }}
    >
      <Typography variant="body2" sx={{ color: '#ccc' }}>
        Copyright © {currentYear} rudil24. GNU General Public License v3.0
      </Typography>
    </Box>
  );
}

export default Footer;