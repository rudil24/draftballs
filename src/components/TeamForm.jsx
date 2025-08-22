import React, { useState, useEffect } from 'react';
import TeamInputRow from './TeamInputRow';
import { Box, Button, Typography, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

function TeamForm({ numTeams, initialTeamsData, colorArray, onRunLottery, onClear, disabled }) {
  const [localTeams, setLocalTeams] = useState([]);

  useEffect(() => {
    // This effect runs when numTeams changes or on initial load
    const newTeams = Array.from({ length: numTeams }, (_, i) => {
      const existingTeam = initialTeamsData.find(t => t.teamId === i + 1);
      return {
        teamId: i + 1,
        teamName: existingTeam?.teamName || '',
        teamBalls: existingTeam?.teamBalls || '',
        color: colorArray[i % colorArray.length],
      };
    });
    setLocalTeams(newTeams);
  }, [numTeams, initialTeamsData, colorArray]);

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
      <Box sx={{ mb: 2 }}>
        <Typography variant="overline">Total Balls: {totalBalls}</Typography>
      </Box>
      <Stack spacing={1.5}>
        {localTeams.map(team => (
          <TeamInputRow
            key={team.teamId}
            team={team}
            onTeamChange={handleTeamChange}
            disabled={disabled}
          />
        ))}
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