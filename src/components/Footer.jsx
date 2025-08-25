import React from "react";
import { Box, Typography } from "@mui/material";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{
        textAlign: 'center',
        py: 2,
        mt: 4,
      }}
    >
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Copyright © {currentYear} rudil24. GNU General Public License v3.0
      </Typography>
    </Box>
  );
}

export default Footer;