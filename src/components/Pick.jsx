import React, { useState } from 'react';
import { Button, Paper, Typography, Box } from '@mui/material';

function Pick({ pick, team }) {
  const [isRevealed, setIsRevealed] = useState(false);

  if (!isRevealed) {
    return (
      <Button 
        variant="outlined" 
        fullWidth 
        onClick={() => setIsRevealed(true)}
        sx={{ justifyContent: 'flex-start', p: 1.5 }}
      >
        Pick #{pick.pickNumber}
      </Button>
    );
  }

  return (
    <Paper 
      variant="outlined" 
      sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}
    >
      <Typography variant="body1" sx={{ width: '3em' }}>
        #{pick.pickNumber}
      </Typography>
      <Box 
        sx={{ 
          width: 20, 
          height: 20, 
          borderRadius: '50%', 
          backgroundColor: team.color,
          border: '1px solid grey',
        }} 
      />
      <Typography variant="body1" sx={{ fontWeight: 'bold', color: team.color, flexGrow: 1 }}>
        {team.teamName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        ({team.teamBalls} balls)
      </Typography>
    </Paper>
  );
}

export default Pick;