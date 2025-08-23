import React from 'react';
import { Box } from '@mui/material';
import hopperImg from '../assets/hopper.jpg'; 

function HopperVisualizer() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mb={3}
    >
      <Box
        component="img"
        src={hopperImg}
        alt="Lottery hopper with ping pong balls"
        sx={{
          // Responsive image styling
          width: '70%',      // Use a percentage of the container's width
          maxWidth: '350px', // But don't let it get too big
          height: 'auto',    // Maintain aspect ratio
          borderRadius: '8px',
        }}
      />
    </Box>
  );
}

export default HopperVisualizer;