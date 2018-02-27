import React from 'react';
import classes from './DrawerToggle.css';

//shown on screens < 500px
//displayed as 3 lines with flexbox display
const drawerToggle=(props)=>(
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div> </div>
    <div> </div>
    <div> </div>
  </div>
);

export default drawerToggle;