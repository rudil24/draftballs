import React, { useState, useEffect, useMemo } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
  Container,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import { indigo } from '@mui/material/colors';

import Header from './components/Header';
import Footer from './components/Footer';
import Settings from './components/Settings';
import TeamForm from './components/TeamForm';
import HopperVisualizer from './components/HopperVisualizer';
import ResultsDisplay from './components/ResultsDisplay';

const colorPalette = [
  { light: '#C00000', dark: '#FF5656' }, // 1. Red
  { light: '#00358E', dark: '#6A9FFF' }, // 2. Blue
  { light: '#006421', dark: '#00E94F' }, // 3. Green
  { light: '#6A009C', dark: '#D07CFF' }, // 4. Purple
  { light: '#B85E00', dark: '#FFA947' }, // 5. Orange
  { light: '#998100', dark: '#FFF27D' }, // 6. Gold
  { light: '#85004E', dark: '#FF74C8' }, // 7. Magenta
  { light: '#006670', dark: '#00F5FF' }, // 8. Teal
  { light: '#5C3A00', dark: '#D4A86A' }, // 9. Brown
  { light: '#006161', dark: '#00E2E2' }, // 10. Cyan
  { light: '#A30000', dark: '#FF8787' }, // 11. Crimson
  { light: '#260E69', dark: '#BAB1F3' }, // 12. Indigo
  { light: '#007C55', dark: '#00FFB2' }, // 13. Mint Green
  { light: '#737373', dark: '#FFFFFF' }, // 14. Gray/White
  { light: '#CF4B00', dark: '#FFB891' }, // 15. Vermilion
  { light: '#3C4000', dark: '#DCE43D' }, // 16. Olive
];

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = prefersDarkMode ? 'dark' : 'light';

  const theme = useMemo(() => createTheme({
    breakpoints: {
      values: { xs: 0, sm: 600, tablet: 750, md: 900, lg: 1200, xl: 1920 },
    },
    palette: {
      mode,
      primary: { main: indigo[500] },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontSize: '1.6rem',
        '@media (min-width:750px)': { fontSize: '2.125rem' },
      },
      h6: {
        fontSize: '1.1rem',
        '@media (min-width:750px)': { fontSize: '1.25rem' },
      },
      body1: {
        fontSize: '0.9rem',
        '@media (min-width:750px)': { fontSize: '1rem' },
      },
      body2: {
        fontSize: '0.8rem',
        '@media (min-width:750px)': { fontSize: '0.875rem' },
      },
    },
  }), [prefersDarkMode]);

  const [numTeams, setNumTeams] = useState(() => JSON.parse(localStorage.getItem('draftballs_numTeams')) || 12);
  const [teamsData, setTeamsData] = useState(() => JSON.parse(localStorage.getItem('draftballs_teamsData')) || []);
  const [pickResults, setPickResults] = useState(() => JSON.parse(localStorage.getItem('draftballs_pickResults')) || []);
  const [timestamp, setTimestamp] = useState(() => localStorage.getItem('draftballs_timestamp') || null);
  const [revealedPicks, setRevealedPicks] = useState(() => new Set(JSON.parse(localStorage.getItem('draftballs_revealedPicks')) || []));
  
  const [lotteryStatus, setLotteryStatus] = useState(() => {
     return (JSON.parse(localStorage.getItem('draftballs_pickResults')) || []).length > 0 ? 'results_ready' : 'setup';
  });

  useEffect(() => {
    localStorage.setItem('draftballs_numTeams', JSON.stringify(numTeams));
    localStorage.setItem('draftballs_teamsData', JSON.stringify(teamsData));
    localStorage.setItem('draftballs_pickResults', JSON.stringify(pickResults));
    if (timestamp) localStorage.setItem('draftballs_timestamp', timestamp);
    localStorage.setItem('draftballs_revealedPicks', JSON.stringify(Array.from(revealedPicks)));
  }, [numTeams, teamsData, pickResults, timestamp, revealedPicks]);

  const handleRevealPick = (pickNumber) => {
    setRevealedPicks(prev => new Set(prev).add(pickNumber));
  };

  const handleRunLottery = (finalTeamsData) => {
    setTeamsData(finalTeamsData);
    setRevealedPicks(new Set());

    const hopperArray = [];
    finalTeamsData.forEach(team => {
        for (let i = 0; i < team.teamBalls; i++) {
            hopperArray.push({ teamId: team.teamId, teamName: team.teamName }); 
        }
    });

    for (let i = hopperArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [hopperArray[i], hopperArray[j]] = [hopperArray[j], hopperArray[i]];
    }

    const finalPicks = [];
    const pickedTeamIds = new Set();
    while (finalPicks.length < numTeams && hopperArray.length > 0) {  
        const randomIndex = Math.floor(Math.random() * hopperArray.length);
        if (!pickedTeamIds.has(hopperArray[randomIndex].teamId)) {
            finalPicks.push(hopperArray[randomIndex]);
            pickedTeamIds.add(hopperArray[randomIndex].teamId);
        }
    }

    setPickResults(finalPicks.map((pick, index) => ({ ...pick, pickNumber: index + 1 })));
    setTimestamp(new Date().toLocaleString());
    setLotteryStatus('results_ready');
  };

  const handleReset = () => {
    setTeamsData([]);
    setPickResults([]);
    setTimestamp(null);
    setRevealedPicks(new Set());
    setLotteryStatus('setup');
    localStorage.removeItem('draftballs_teamsData');
    localStorage.removeItem('draftballs_pickResults');
    localStorage.removeItem('draftballs_timestamp');
    localStorage.removeItem('draftballs_revealedPicks');
  };
  
  const isLocked = lotteryStatus === 'results_ready';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Container component="main" maxWidth="xl" sx={{ my: { xs: 2, sm: 4 }, flexGrow: 1 }}>
          {/* Add display: 'flex' to make the container's children (the items) height-aware */}
          <Grid container spacing={{ xs: 2, sm: 4 }} sx={{ height: '100%' }}>
            
            {/* FIX: Make the Grid item a flex container */}
            <Grid item xs={12} tablet={6} sx={{ display: 'flex' }}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, sm: 3 },
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1, // FIX: Allow Paper to grow vertically
                }}
              >
                <Settings numTeams={numTeams} onNumTeamsChange={(v) => setNumTeams(Number(v))} disabled={isLocked} />
                <TeamForm
                  key={numTeams}
                  numTeams={numTeams}
                  initialTeamsData={teamsData}
                  colorPalette={colorPalette}
                  mode={mode}
                  onRunLottery={handleRunLottery}
                  onClear={handleReset}
                  disabled={isLocked}
                />
              </Paper>
            </Grid>

            {/* FIX: Make the Grid item a flex container */}
            <Grid item xs={12} tablet={6} sx={{ display: 'flex' }}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 2, sm: 3 },
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1, // FIX: Allow Paper to grow vertically
                }}
              >
                <HopperVisualizer />
                {lotteryStatus === 'results_ready' && (
                  <ResultsDisplay
                    pickResults={pickResults}
                    teamsData={teamsData}
                    timestamp={timestamp}
                    revealedPicks={revealedPicks}
                    onRevealPick={handleRevealPick}
                  />
                )}
              </Paper>
            </Grid>

          </Grid>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;