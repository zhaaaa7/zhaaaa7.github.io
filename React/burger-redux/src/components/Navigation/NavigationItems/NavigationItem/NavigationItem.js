import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from "react-router-dom";

//user NavLink in react-router
const navigationItem=(props)=>(
    <li className={classes.NavigationItem}>
        <NavLink to={props.link}
        exact
        activeClassName={classes.active} >{props.children} </NavLink>
        {/* specify the activeClassName because the use of css module which turn every class into a long string*/}
    </li>

);

export default navigationItem;