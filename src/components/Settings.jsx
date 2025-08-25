import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function Settings({ numTeams, onNumTeamsChange, disabled }) {
  const [localNumTeams, setLocalNumTeams] = React.useState(numTeams);

  return (
    <Box display="flex" alignItems="center" gap={2} mb={3} sx={{ flexWrap: 'wrap', flexShrink: 0 }}>
      <Typography variant="body1" component="label" htmlFor="num-teams" sx={{ flexShrink: 0 }}>
        Teams
      </Typography>
      <TextField
        id="num-teams"
        type="number"
        value={localNumTeams}
        onChange={(e) => setLocalNumTeams(e.target.value)}
        disabled={disabled}
        inputProps={{ min: 1, max: 18, step: 1 }} // UPDATED: max is now 18
        size="small"
      />
      <Button variant="outlined" onClick={() => onNumTeamsChange(localNumTeams)} disabled={disabled}>
        Update
      </Button>
    </Box>
  );
}

export default Settings;