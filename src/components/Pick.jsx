import React from 'react';
import { Button, Paper, Typography, Box, Tooltip } from '@mui/material';

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

  const textColor = team.color === '#FFFFFF' ? '#000000' : team.color;

  return (
    <Paper 
      variant="outlined" 
      sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 2, backgroundColor: 'action.hover' }}
    >
      <Typography variant="body1" sx={{ width: '3em', color: 'text.secondary' }}>
        #{pick.pickNumber}
      </Typography>
      
      {/* UPDATED: Wrapped the Box in a Tooltip */}
      <Tooltip title={team.alttext || ''} placement="top" arrow>
        <Box 
          sx={{ 
            width: '1.25rem', 
            height: '1.25rem', 
            borderRadius: '50%', 
            backgroundColor: team.color,
            flexShrink: 0
          }} 
        />
      </Tooltip>
      
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