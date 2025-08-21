// rudil24 script main objectives (denoted with an M throughout the file):
// M1. get numTeams from user
// M2. build a form for user to enter teamName and teamBalls for all numTeams
// M3. on submit of the form, build teamsData array of objects that captures all form fields.
// M4. use teamBalls to build hopperArray filled with RANDOM entries in the amount of teamName[i] x teamBalls[i]
// M5. make numTeams amount of RANDOM picks from hopperArray and only push unique teamId's into pickResults
// M6. display result to user, but with a button reveal opportunity for each pick. 
// M7. Give user opportunity to update the number of teams and use the existing input field values in the form

// global constants. all of these document element fields & buttons are found in the .html file
const numTeamsButton = document.getElementById('num-teams-button');
const teamsForm = document.getElementById('teams-form');
const hopperOutputDiv = document.getElementById('hopper-output-container');
let numTeams = 12; //default (most fantasy leagues have 12 teams)
document.getElementById('num-teams').value = numTeams; //set the default in the .html page

// M1. get numTeams from user
// listen for click of numTeamsButton
// get the value in numTeams input field at that time
numTeamsButton.addEventListener('click', function() {
    numTeams = document.getElementById('num-teams').value;
    // M2. build a form for user to enter teamName and teamBalls for all numTeams
    // Generate input fields dynamically with a <div> in the form for each team
    for (let i = 1; i <= numTeams; i++) {
        const teamDiv = document.createElement('div');
        teamDiv.innerHTML = `
            <label for="team-${i}-name">Team ${i}</label>
            <input required type="text" id="team-${i}-name" name="team-${i}-name" placeholder="Team ${i} Name">
            <label for="team-${i}-balls">Balls:</label>
            <input required type="number" min="1" max="1000" id="team-${i}-balls" name="team-${i}-balls"><br>
        `;
        // Insert each form "row" before the <button id=teams-submit-button, which is
        // the lastElementChild of the form
        teamsForm.insertBefore(teamDiv, teamsForm.lastElementChild); 
    }
    //unhide the submit button in the DOM
    document.getElementById('teams-form-submit-button').removeAttribute('hidden'); // Shows the button
});
// M3. on submit of the form, build teamsData array of objects that captures all form fields.
teamsForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form actions (such as clearing the form)
    let teamsData = []; //will hold our form data
    for (let i = 1; i <= numTeams; i++) {
        let value1 = document.getElementById(`team-${i}-name`).value;
        let value2 = document.getElementById(`team-${i}-balls`).value;
        teamsData.push({
            teamId: i,
            teamName: value1,
            teamBalls: value2
        });
        // leave the form up but disable all the fields.
        document.getElementById(`team-${i}-name`).disabled = true;
        document.getElementById(`team-${i}-balls`).disabled = true;
    }
    document.getElementById('teams-form-submit-button').disabled= true; // disable the submit button, too
    console.log('\n--- teamsData built ---');
    console.log(teamsData); // Log teamsData to console for inspection
    // M4. use teamBalls to build hopperArray filled with RANDOM entries in the amount of teamName[] x teamBalls[]
    // make the proper amount of balls for each team (held in teamsData) and put them into hopperArray
    const hopperArray = [];
    for (const team of teamsData) {
        for (let i = 0; i < team.teamBalls; i++) {
        // Create a new object to avoid modifying the original team object by reference
        hopperArray.push({ teamId: team.teamId, teamName: team.teamName }); 
        }
    }
    console.log('\n--- hopperArray built ---');
    console.log(hopperArray);
    // Shuffle the Array (Fisher-Yates Algorithm) ---
    // This is the most efficient and standard way to shuffle an array.
    // We iterate backwards from the last element.
    for (let i = hopperArray.length - 1; i > 0; i--) {
        // Pick a random index from 0 to i (inclusive).
        const j = Math.floor(Math.random() * (i + 1));
        // Swap the element at the current index 'i' with the element at the random index 'j'.
        // Using array destructuring for a clean, one-line swap.
        [hopperArray[i], hopperArray[j]] = [hopperArray[j], hopperArray[i]];
    }
    console.log('\n--- hopperArray After Shuffle (balls are randomly mixed) ---');
    console.log(hopperArray);

    // M5. make numTeams amount of RANDOM picks from hopperArray and only push unique teamId's into pickResults
    const pickResults = [];
    const pickedTeamIds = new Set(); // To keep track of unique teamIds already picked
    while (pickResults.length < numTeams && pickedTeamIds.size < hopperArray.length) {  //safeguard for infinite loop 
        const randomIndex = Math.floor(Math.random() * hopperArray.length);
        const randomElement = hopperArray[randomIndex];
        //check random element to make sure it hasn't been pushed to pickResults already    
        if (!pickedTeamIds.has(randomElement.teamId)) {
            pickResults.push(randomElement);
            pickedTeamIds.add(randomElement.teamId); //add to our set so we don't pick it again
        }
    }
    console.log('\n--- pickResults ---');
    console.log(pickResults);

    // M6. display result to user, but with a button reveal opportunity for each pick. 
    for (let i = 0; i < pickResults.length; i++) {
        const pickResult = pickResults[i];
        const teamName = pickResult.teamName;
        const teamId = pickResult.teamId;
        const teamBalls = teamsData.find(team => team.teamId === teamId).teamBalls;
        const pickDiv = document.createElement('div');
        pickDiv.innerHTML = `
            <button class="reveal-button" data-team-id="${teamId}">Pick ${i + 1}</button>
        `;
        hopperOutputDiv.appendChild(pickDiv);           
        const revealButton = pickDiv.querySelector('.reveal-button');
        revealButton.addEventListener('click', function() {
            const thisTeamId = this.dataset.teamId;
            const thisTeamData = teamsData.find(team => team.teamId === teamId);
            const thisTeamBalls = thisTeamData.teamBalls;
            const thisTeamName = thisTeamData.teamName; 
            // Remove the button and add the text
            this.remove();
            pickDiv.innerHTML += `
                <p>Pick ${i + 1}: ${thisTeamName} (had ${thisTeamBalls} balls)</p>
            `;
        });                                     
    }
});


