import React from 'react';
import './UserSettings.css';

const maxTeams = 16;

function UserSettings(props) {
  return (
    <div className = "user-settings">
      <form>
        <input {"Number of Teams"}
        />
        <button onClick={} >Submit</button> 
      </form>
    </div>
    <p>Total Balls: {props.totalBalls}</p>
  );
}
//import totalBalls from TeamEntry
//(future: possibly set totalBalls here. for now, just display running total from form, any time balls are changed in any team row)
//export: totalTeams to TeamEntry on "Submit"

// Process Flow:
// A user changes a numeric field in the TeamEntry.teamBalls component.
// The onChange event handler for that input field is triggered.
// This handler calls the handleInputChange function passed down from the parent (App.jsx)
// The handleInputChange function in the parent updates the parent's state with the new value of the changed field.
// Since the parent's state has changed, React re-renders the parent component.
// The parent component re-calculates the sum based on the updated state.
// The parent component passes the new sum as a prop to the sum display component, causing it to re-render and display the updated sum.
// This allows for real-time updates of the sum as the user types, without requiring a form submission.

