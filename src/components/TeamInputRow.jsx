import React from 'react';
import { TextField, Box, Typography, Tooltip } from '@mui/material';

function TeamInputRow({ team, onTeamChange, percentage, disabled }) {
  const textColor = team.color === '#FFFFFF' ? '#000000' : team.color;

  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <Typography variant="body2" sx={{ width: '3em', textAlign: 'right', flexShrink: 0, fontSize: { xs: '0.8rem', sm: '0.9rem', tablet: '1rem' } }}>
        {team.teamId}.
      </Typography>
      
      {/* UPDATED: Wrapped the Box in a Tooltip */}
      <Tooltip title={team.alttext || ''} placement="top" arrow>
        <Box 
          sx={{ 
            width: '1.25rem', 
            height: '1.25rem',
            flexShrink: 0,
            borderRadius: '50%', 
            backgroundColor: team.color,
          }} 
        />
      </Tooltip>
      
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          label="Team Name"
          value={team.teamName}
          onChange={(e) => onTeamChange(team.teamId, 'teamName', e.target.value)}
          fullWidth
          required
          disabled={disabled}
          variant="outlined"
          size="small"
          InputLabelProps={{ style: { color: textColor } }}
        />
      </Box>
      
      <TextField
        label="Balls"
        type="number"
        value={team.teamBalls}
        onChange={(e) => onTeamChange(team.teamId, 'teamBalls', e.target.value)}
        required
        disabled={disabled}
        inputProps={{ min: 1 }}
        variant="outlined"
        size="small"
        sx={{ width: '5.625rem', flexShrink: 0 }}
      />
      
      <Typography 
        variant="body2" 
        sx={{ 
          width: '3.4375rem',
          textAlign: 'right', 
          color: 'text.secondary',
          fontVariantNumeric: 'tabular-nums',
          flexShrink: 0,
          fontSize: { xs: '0.8rem', sm: '0.9rem', tablet: '1rem' }
        }}
      >
        {percentage.toFixed(1)}%
      </Typography>
    </Box>
  );
}

export default TeamInputRow;