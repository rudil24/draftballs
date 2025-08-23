import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

function TeamInputRow({ team, onTeamChange, percentage, disabled }) {
  const textColor = team.color === 'black' ? '#FFFFFF' : team.color;

  return (
    // The main flex container for the row
    <Box display="flex" alignItems="center" gap={1.5}>
      
      {/* Column 1: Team ID */}
      <Typography variant="body1" sx={{ width: '3em', textAlign: 'right', flexShrink: 0 }}>
        {team.teamId}.
      </Typography>
      
      {/* Column 2: Color Indicator */}
      <Box 
        sx={{ 
          width: 20, 
          height: 20,
          flexShrink: 0,
          borderRadius: '50%', 
          backgroundColor: team.color,
          border: '1px solid grey',
        }} 
      />
      
      {/* Column 3: Team Name (takes up remaining space) */}
      <Box sx={{ flexGrow: 1 }}>
        <TextField
          label="Team Name"
          value={team.teamName}
          onChange={(e) => onTeamChange(team.teamId, 'teamName', e.target.value)}
          fullWidth // Fills the parent Box
          required
          disabled={disabled}
          variant="outlined"
          size="small"
          InputLabelProps={{
            style: { color: textColor },
          }}
        />
      </Box>
      
      {/* Column 4: Balls Input (wider) */}
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
        sx={{ width: '90px', flexShrink: 0 }} // Increased width
      />
      
      {/* Column 5: Percentage Display */}
      <Typography 
        variant="body1" 
        sx={{ 
          width: '55px', 
          textAlign: 'right', 
          color: 'text.secondary',
          fontVariantNumeric: 'tabular-nums',
          flexShrink: 0
        }}
      >
        {percentage.toFixed(1)}%
      </Typography>
    </Box>
  );
}

export default TeamInputRow;