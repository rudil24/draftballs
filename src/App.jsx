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

const ballColorPalette = [
    { lightmode: '#fae228', darkmode: '#fdf7a0', lightmodeAlttext: 'vivid yellow', darkmodeAlttext: 'pale yellow'},
    { lightmode: '#1476b2', darkmode: '#94caea', lightmodeAlttext: 'vivid blue', darkmodeAlttext: 'pale blue'},
    { lightmode: '#d14142', darkmode: '#f8b5b2', lightmodeAlttext: 'vivid red', darkmodeAlttext: 'pale red'},
    { lightmode: '#5f4a86', darkmode: '#bca7d0', lightmodeAlttext: 'vivid violet', darkmodeAlttext: 'pale violet'},
    { lightmode: '#e88d37', darkmode: '#ffcfa0', lightmodeAlttext: 'vivid orange', darkmodeAlttext: 'pale orange'},
    { lightmode: '#249847', darkmode: '#a9d7a9', lightmodeAlttext: 'vivid green', darkmodeAlttext: 'pale green'},
    { lightmode: '#ba3485', darkmode: '#e6a5d0', lightmodeAlttext: 'vivid magenta', darkmodeAlttext: 'pale magenta'},
    { lightmode: '#029f9f', darkmode: '#96d3d2', lightmodeAlttext: 'vivid cyan', darkmodeAlttext: 'pale cyan'},
    { lightmode: '#a9ca3d', darkmode: '#c8e89c', lightmodeAlttext: 'vivid lime', darkmodeAlttext: 'pale lime'},
    { lightmode: '#8a762c', darkmode: '#bfab6d', lightmodeAlttext: 'dark yellow', darkmodeAlttext: 'muted yellow'},
    { lightmode: '#2c4766', darkmode: '#607697', lightmodeAlttext: 'dark blue', darkmodeAlttext: 'muted blue'},
    { lightmode: '#7d292b', darkmode: '#b27d7a', lightmodeAlttext: 'dark red', darkmodeAlttext: 'muted red'},
    { lightmode: '#473a60', darkmode: '#827492', lightmodeAlttext: 'dark violet', darkmodeAlttext: 'muted violet'},
    { lightmode: '#885332', darkmode: '#bc906b', lightmodeAlttext: 'dark orange', darkmodeAlttext: 'muted orange'},
    { lightmode: '#2c5e39', darkmode: '#759676', lightmodeAlttext: 'dark green', darkmodeAlttext: 'muted green'},
    { lightmode: '#68274d', darkmode: '#9e728b', lightmodeAlttext: 'dark magenta', darkmodeAlttext: 'muted magenta'},
    { lightmode: '#195d65', darkmode: '#5a8c8b', lightmodeAlttext: 'dark cyan', darkmodeAlttext: 'muted cyan'},
    { lightmode: '#617030', darkmode: '#95a271', lightmodeAlttext: 'dark lime', darkmodeAlttext: 'muted lime'},
];

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const mode = prefersDarkMode ? 'dark' : 'light';

  const theme = useMemo(() => createTheme({
    breakpoints: { values: { xs: 0, sm: 600, tablet: 750, md: 900, lg: 1200, xl: 1920 } },
    palette: { mode, primary: { main: indigo[500] } },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontSize: '1.6rem', '@media (min-width:750px)': { fontSize: '2.125rem' } },
      h6: { fontSize: '1.1rem', '@media (min-width:750px)': { fontSize: '1.25rem' } },
      body1: { fontSize: '0.9rem', '@media (min-width:750px)': { fontSize: '1rem' } },
      body2: { fontSize: '0.8rem', '@media (min-width:750px)': { fontSize: '0.875rem' } },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          InputLabelProps: { sx: { fontSize: { xs: '0.8rem', sm: '0.9rem', tablet: '1rem' } } },
          inputProps: { sx: { fontSize: { xs: '0.8rem', sm: '0.9rem', tablet: '1rem' } } },
        },
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

  const handleRevealPick = (pickNumber) => { setRevealedPicks(prev => new Set(prev).add(pickNumber)); };
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
        <Container component="main" maxWidth="xl" sx={{ my: { xs: 2, sm: 4 }, flexGrow: 1, display: 'flex' }}>
          <Grid container spacing={{ xs: 2, sm: 4 }} sx={{ flexGrow: 1 }}>
            <Grid item xs={12} tablet={6} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, maxHeight: { xs: '75vh', tablet: 'none' } }}>
                <Settings 
                  numTeams={numTeams} 
                  onNumTeamsChange={(v) => setNumTeams(Number(v))} 
                  disabled={isLocked}
                  onClear={handleReset} // Pass onClear prop here
                  isLocked={isLocked}      // Pass isLocked to control visibility
                />
                <TeamForm 
                  key={numTeams} 
                  numTeams={numTeams} 
                  initialTeamsData={teamsData} 
                  colorPalette={ballColorPalette} 
                  mode={mode} 
                  onRunLottery={handleRunLottery} 
                  disabled={isLocked} 
                />
              </Paper>
            </Grid>
            <Grid item xs={12} tablet={6} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1, maxHeight: { xs: '75vh', tablet: 'none' } }}>
                <HopperVisualizer />
                {lotteryStatus === 'results_ready' && ( <ResultsDisplay pickResults={pickResults} teamsData={teamsData} timestamp={timestamp} revealedPicks={revealedPicks} onRevealPick={handleRevealPick} /> )}
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