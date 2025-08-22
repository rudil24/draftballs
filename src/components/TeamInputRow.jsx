import React from 'react';
import { TextField, Box, Typography } from '@mui/material';

function TeamInputRow({ team, onTeamChange, disabled }) {
  return (
    <Box display="flex" alignItems="center" gap={1.5}>
      <Typography variant="body2" sx={{ width: '2em', textAlign: 'right' }}>
        {team.teamId}.
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
      <TextField
        label="Team Name"
        value={team.teamName}
        onChange={(e) => onTeamChange(team.teamId, 'teamName', e.target.value)}
        fullWidth
        required
        disabled={disabled}
        variant="outlined"
        size="small"
        InputLabelProps={{
          style: { color: team.color },
        }}
      />
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
        sx={{ width: '100px' }}
      />
    </Box>
  );
}

export default TeamInputRow;