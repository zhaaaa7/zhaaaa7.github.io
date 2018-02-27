import React from 'react';
import classes from './Button.css';

//use btnType property on Button component to control display
//now just 2 types :"Success" "Danger" 
const button=(props)=>(
    <button 
        className={[classes.Button, classes[props.btnType]].join(' ')} 
        onClick={props.clicked}
        disabled={props.disabled}>{props.children}</button>

);
    
export default button;