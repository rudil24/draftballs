import React from 'react';
import Pick from './Pick';
import { Stack, Typography, Box } from '@mui/material';

function ResultsDisplay({ pickResults, teamsData }) {
  const pickTimestamp = new Date().toLocaleString();

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
          />
        ))}
      </Stack>
      <Typography variant="caption" display="block" align="center" sx={{ mt: 2 }}>
        Lottery run on: {pickTimestamp}
      </Typography>
    </Box>
  );
}

export default ResultsDisplay;