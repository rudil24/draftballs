import React, { useState, useEffect } from 'react';
import TeamInputRow from './TeamInputRow';
import { Box, Button, Typography, Stack, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

// A new component for the column headers
const FormHeader = ({ totalBalls }) => (
  <Box display="flex" alignItems="center" sx={{ pl: 'calc(3em + 20px + 28px)' }}> {/* Offset to align with columns */}
    <Box sx={{ flexGrow: 1 }} /> {/* Spacer to push content to the right */}
    <TextField
      label="SUM"
      value={totalBalls}
      disabled
      variant="outlined"
      size="small"
      sx={{ width: '90px', mr: 1.5 }} // Matches TeamInputRow's ball field width
    />
    <Typography 
      variant="body2" 
      sx={{ 
        width: '55px', 
        textAlign: 'right', 
        color: 'text.secondary'
      }}
    >
      %
    </Typography>
  </Box>
);


function TeamForm({ numTeams, initialTeamsData, colorPalette, mode, onRunLottery, onClear, disabled }) {
  const [localTeams, setLocalTeams] = useState([]);

  useEffect(() => {
    const newTeams = Array.from({ length: numTeams }, (_, i) => {
      const existingTeam = initialTeamsData.find(t => t.teamId === i + 1);
      return {
        teamId: i + 1,
        teamName: existingTeam?.teamName || '',
        teamBalls: existingTeam?.teamBalls || '',
        // Assign the correct color variant based on the current mode
        color: colorPalette[i % colorPalette.length][mode],
      };
    });
    setLocalTeams(newTeams);
  }, [numTeams, initialTeamsData, colorPalette, mode]);

  const handleTeamChange = (id, field, value) => {
    setLocalTeams(prevTeams =>
      prevTeams.map(team =>
        team.teamId === id ? { ...team, [field]: value } : team
      )
    );
  };
  
  const totalBalls = localTeams.reduce((sum, team) => sum + Number(team.teamBalls || 0), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRunLottery(localTeams);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render the new header component */}
      <FormHeader totalBalls={totalBalls} />
      
      <Stack spacing={1.5} sx={{ mt: 1 }}>
        {localTeams.map(team => {
          const percentage = totalBalls > 0 ? (Number(team.teamBalls || 0) / totalBalls) * 100 : 0;
          return (
            <TeamInputRow
              key={team.teamId}
              team={team}
              onTeamChange={handleTeamChange}
              percentage={percentage}
              disabled={disabled}
            />
          );
        })}
      </Stack>
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={onClear}
        >
          Clear
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PlayCircleFilledWhiteIcon />}
          disabled={disabled}
        >
          GO!
        </Button>
      </Box>
    </form>
  );
}

export default TeamForm;