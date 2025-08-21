import React, { useState, useEffect } from 'react';
import './TeamEntry.css';

Array.from({length: numTeams},(_,index) => TeamAttributes key={index} />)



//import totalTeams and create a reviseTotal teams to receive it as a prop from UserSettings
//
//export the teamsTable to
const defaultTeams = 12;
const maxTeams = 16;
const colorArray = ["gold", "navy", "red", "purple", "orangered", "darkgreen", "maroon", "black", 
                          "yellow", "blue", "crimson", "mediumpurple", "orange", "lightgreen", "brown", "gray"]
                          //going with billiard-ball-like for 16 colors. lighter hues for "stripes" 9-15, 16 is gray.
const defaultTotalBalls = 120; 
const maxTotalBalls = 1000;
const defaultTeamBalls = (defaultTotalBalls / defaultTeams);
const defaultTeamPercentofBalls = 1 / defaultTeamBalls;
// should be ok for non-zero since it's our hard-coded constant
// if not, & when calculating in real-time, we'll use: 
// OneOverX = !(Number.isNaN(x) || x === 0) && (1 / x); //check for zero/non-number before we 1/x it.

const defaultTeamRows = [];
for (let i = 0; i < defaultNumTeams; i++) {
  defaultTeamRows.push({
    teamName: '',
    teamColor: defaultTeamColor[i], //get the color for the proper array position
    teamBalls: defaultTeamBalls,
    teamPercentOfBalls: (teamBalls / defaultTotalBalls), // Example of an array as an attribute
  });
}

let teamRow = []; //the row of user input we get for each team


function teamEntry(props) {

return (
  <>
    <div className="form-wrapper">
      <form onSubmit={handleSubmit} classname="data-form">
        <div className="form-grid">

        </div>
      </form>  
    </div>
  
  </>
)
}
export default TeamEntry;