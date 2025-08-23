import React from 'react';
import Pick from './Pick';
import { Stack, Typography, Box } from '@mui/material';

function ResultsDisplay({ pickResults, teamsData, timestamp, revealedPicks, onRevealPick }) {
  return (
    <Box>
       <Typography variant="h6" component="h3" gutterBottom align="center">
        Draft Order
      </Typography>
      <Stack spacing={1}>
        {pickResults.map(pick => (
          <Pick
            key={pick.pickNumber}
            pick={pick}
            team={teamsData.find(t => t.teamId === pick.teamId)}
            isRevealed={revealedPicks.has(pick.pickNumber)}
            onReveal={() => onRevealPick(pick.pickNumber)}
          />
        ))}
      </Stack>
      {timestamp && (
        <Typography variant="caption" display="block" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
          Lottery run on: {timestamp}
        </Typography>
      )}
    </Box>
  );
}

export default ResultsDisplay;