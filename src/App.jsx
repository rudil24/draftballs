import React, { useState, useEffect, useMemo } from 'react';

// Material-UI Core & Styles
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  CssBaseline,
  useMediaQuery,
  Container,
  Grid,
  Paper,
  Box,
} from '@mui/material';
import { indigo } from '@mui/material/colors';

// App Components
import Header from './components/Header';
import Footer from './components/Footer';
import Settings from './components/Settings';
import TeamForm from './components/TeamForm';
import HopperVisualizer from './components/HopperVisualizer';
import ResultsDisplay from './components/ResultsDisplay';

const colorArray = ["gold", "navy", "red", "purple", "orangered", "darkgreen", "maroon", "black", 
                          "yellow", "blue", "crimson", "mediumpurple", "orange", "lightgreen", "brown", "gray"];

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  let theme = useMemo(
    () =>
      createTheme({
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            tablet: 750,
            md: 900,
            lg: 1200,
            xl: 1920,
          },
        },
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: indigo[500],
          },
        },
      }),
    [prefersDarkMode],
  );

  theme = responsiveFontSizes(theme);

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

  const handleRevealPick = (pickNumber) => setRevealedPicks(prev => new Set(prev).add(pickNumber));

  // --- FIX: Restored full function logic ---
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

  // --- FIX: Restored full function logic ---
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
        
        <Container component="main" maxWidth="xl" sx={{ my: 4, flexGrow: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} tablet={6}>
              <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, height: '100%', maxWidth: { xs: 420, tablet: '100%' }, mx: 'auto' }}>
                <Settings numTeams={numTeams} onNumTeamsChange={(v) => setNumTeams(Number(v))} disabled={isLocked} />
                <TeamForm key={numTeams} numTeams={numTeams} initialTeamsData={teamsData} colorArray={colorArray} onRunLottery={handleRunLottery} onClear={handleReset} disabled={isLocked} />
              </Paper>
            </Grid>
            
            <Grid item xs={12} tablet={6}>
              <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, height: '100%', maxWidth: { xs: 420, tablet: '100%' }, mx: 'auto' }}>
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