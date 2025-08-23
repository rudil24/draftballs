import React from 'react';
import Pick from './Pick';
import { Stack, Typography, Box } from '@mui/material';

function ResultsDisplay({ pickResults, teamsData, timestamp, revealedPicks, onRevealPick }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Typography variant="h6" component="h3" gutterBottom align="center" sx={{ flexShrink: 0 }}>
        Draft Order
      </Typography>
      
      <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: { xs: 0.5, sm: 1 } }}>
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
      </Box>

      {timestamp && (
        <Typography variant="caption" display="block" align="center" sx={{ mt: 2, flexShrink: 0, color: 'text.secondary' }}>
          Lottery run on: {timestamp}
        </Typography>
      )}
    </Box>
  );
}

export default ResultsDisplay;