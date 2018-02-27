import React from 'react';
import classes from './Input.css';

const input=(props)=>{

    let inputElement=null;
    let inputClasses=[classes.InputElement];

    //apply Invalid style only if touched property is changed, i.e user type in something
    if(props.invalid&&props.shouldValidate&&props.touched){
        inputClasses.push(classes.Invalid);
    }
    inputClasses=inputClasses.join(' ');
    
    //use the elementConfig to pass data in different form components
    switch(props.elementType){
        case('input'):
            inputElement=<input className={inputClasses} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case('textarea'):
            inputElement=<textarea className={inputClasses}{...props.elementConfig } value={props.value} onChange={props.changed}/>;
            break;
        case('select'):
            inputElement=(
            <select 
                className={inputClasses}
                {...props.elementConfig} 
                value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map((option)=>(
                    <option key={option.value} value={option.value}>{option.displayValue} </option>
                ))}
                
            </select>);
            break;
        default:
            inputElement=<input className={inputClasses} {...props.elementConfig} value={props.value} onChange={props.changed}/>
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>    
            {inputElement}        
        </div>
    );

};

export default input;