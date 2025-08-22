import React from "react";
// import { SportsFootballIcon, SportsBasketballIcon, SportsBaseballIcon, SportsGolfIcon } from "@mui/icons-material/Highlight";
// material says DON'T use barrel { , ,} imports, to help minimize bundle size in dev. https://mui.com/material-ui/guides/minimizing-bundle-size/ 
// instead, we'll do each import separately:
import SportsFootballIcon from "@mui/icons-material/Highlight";
import SportsBasketballIcon from "@mui/icons-material/Highlight";
import SportsBaseballIcon from "@mui/icons-material/Highlight";
import SportsGolfIcon from "@mui/icons-material/Highlight";
import './Header.css'

function Header() {
  return (
    <header>
      <h1>
        <SportsFootballIcon /> 
        <SportsBasketballIcon /> 
        <SportsBaseballIcon />
        <SportsGolfIcon />
        draftBalls
      </h1>
    </header>
  );
}

export default Header;
