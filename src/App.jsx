import React, { useState, useEffect, useMemo } from 'react';

// Material-UI Core Components
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
  Container,
  Grid,
  Typography,
  Paper,
} from '@mui/material';
import { indigo } from '@mui/material/colors';

// App Components
import Settings from './components/Settings.jsx';
import TeamForm from './components/TeamForm.jsx';
import HopperVisualizer from './components/HopperVisualizer.jsx';
import ResultsDisplay from './components/ResultsDisplay.jsx';

// This is the array of 16 colors you provided.
const colorArray = ["gold", "navy", "red", "purple", "orangered", "darkgreen", "maroon", "black", 
                          "yellow", "blue", "crimson", "mediumpurple", "orange", "lightgreen", "brown", "gray"];

function App() {
  // THEME MANAGEMENT
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
          primary: {
            main: indigo[500],
          },
          secondary: {
            main: indigo[300],
          },
        },
      }),
    [prefersDarkMode],
  );

  // STATE MANAGEMENT
  const [numTeams, setNumTeams] = useState(() => {
    const savedNum = localStorage.getItem('draftballs_numTeams');
    return savedNum ? JSON.parse(savedNum) : 12;
  });

  const [teamsData, setTeamsData] = useState(() => {
    const savedData = localStorage.getItem('draftballs_teamsData');
    return savedData ? JSON.parse(savedData) : [];
  });
  
  const [pickResults, setPickResults] = useState(() => {
    const savedResults = localStorage.getItem('draftballs_pickResults');
    return savedResults ? JSON.parse(savedResults) : [];
  });
  
  const [lotteryStatus, setLotteryStatus] = useState(() => {
     const savedResults = localStorage.getItem('draftballs_pickResults');
     return savedResults && JSON.parse(savedResults).length > 0 ? 'results_ready' : 'setup';
  });

  // SIDE EFFECTS - Save to Local Storage
  useEffect(() => {
    localStorage.setItem('draftballs_numTeams', JSON.stringify(numTeams));
    localStorage.setItem('draftballs_teamsData', JSON.stringify(teamsData));
    localStorage.setItem('draftballs_pickResults', JSON.stringify(pickResults));
  }, [numTeams, teamsData, pickResults]);

  // HANDLER FUNCTIONS
  const handleRunLottery = (finalTeamsData) => {
    setTeamsData(finalTeamsData);

    const hopperArray = [];
    for (const team of finalTeamsData) {
        for (let i = 0; i < team.teamBalls; i++) {
            hopperArray.push({ teamId: team.teamId, teamName: team.teamName }); 
        }
    }

    for (let i = hopperArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [hopperArray[i], hopperArray[j]] = [hopperArray[j], hopperArray[i]];
    }

    const finalPicks = [];
    const pickedTeamIds = new Set();
    while (finalPicks.length < numTeams && hopperArray.length > 0) {  
        const randomIndex = Math.floor(Math.random() * hopperArray.length);
        const randomElement = hopperArray[randomIndex];
            
        if (!pickedTeamIds.has(randomElement.teamId)) {
            finalPicks.push(randomElement);
            pickedTeamIds.add(randomElement.teamId);
        }
    }

    setPickResults(finalPicks.map((pick, index) => ({ ...pick, pickNumber: index + 1 })));
    setLotteryStatus('results_ready');
  };

  const handleReset = () => {
    setTeamsData([]);
    setPickResults([]);
    setLotteryStatus('setup');
    localStorage.removeItem('draftballs_teamsData');
    localStorage.removeItem('draftballs_pickResults');
  };
  
  const isLocked = lotteryStatus === 'results_ready';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          draftBalls Fantasy League Lottery
        </Typography>
        <Grid container spacing={4}>
          {/* Left Pane */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Settings
                numTeams={numTeams}
                onNumTeamsChange={(newVal) => setNumTeams(Number(newVal))}
                disabled={isLocked}
              />
              <TeamForm
                key={numTeams} // Force re-render on numTeams change
                numTeams={numTeams}
                initialTeamsData={teamsData}
                colorArray={colorArray}
                onRunLottery={handleRunLottery}
                onClear={handleReset}
                disabled={isLocked}
              />
            </Paper>
          </Grid>
          
          {/* Right Pane */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <HopperVisualizer />
              {lotteryStatus === 'results_ready' && (
                <ResultsDisplay 
                  pickResults={pickResults} 
                  teamsData={teamsData}
                />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;