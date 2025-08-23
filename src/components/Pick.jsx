import React from 'react';
import { Button, Paper, Typography, Box } from '@mui/material';

function Pick({ pick, team, isRevealed, onReveal }) {
  if (!isRevealed) {
    return (
      <Button 
        variant="outlined" 
        fullWidth 
        onClick={onReveal}
        sx={{ justifyContent: 'flex-start', p: 1.5 }}
      >
        Pick #{pick.pickNumber}
      </Button>
    );
  }

  // If the team color is black, use white for the text.
  const textColor = team.color === 'black' ? '#FFFFFF' : team.color;

  return (
    <Paper 
      variant="outlined" 
      sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 2, backgroundColor: 'action.hover' }}
    >
      <Typography variant="body1" sx={{ width: '3em', color: 'text.secondary' }}>
        #{pick.pickNumber}
      </Typography>
      <Box 
        sx={{ 
          width: 20, 
          height: 20, 
          borderRadius: '50%', 
          backgroundColor: team.color,
          // border: '1px solid grey', //removed for more matte finish (& matches TeamInputRow style)
          flexShrink: 0
        }} 
      />
      <Typography variant="body1" sx={{ fontWeight: 'bold', color: textColor, flexGrow: 1 }}>
        {team.teamName}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        ({team.teamBalls} balls)
      </Typography>
    </Paper>
  );
}

export default Pick;