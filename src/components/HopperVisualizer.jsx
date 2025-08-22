import React from 'react';
import { Box } from '@mui/material';
import hopperImg from '../assets/hopper.jpg'; // Make sure you have this image in src/assets/

function HopperVisualizer() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mb={3}
    >
      <img 
        src={hopperImg} 
        alt="Lottery hopper with ping pong balls" 
        style={{ maxWidth: '250px', height: 'auto', borderRadius: '8px' }}
      />
    </Box>
  );
}

export default HopperVisualizer;