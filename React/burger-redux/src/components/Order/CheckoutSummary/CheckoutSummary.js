import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

//'checkout' page, dispaly the burger again and two buttons
const checkoutSummary=(props)=> {    
    return (
        <div className={classes.CheckoutSummary}>
            <h3>We Hope it Taste Well!</h3>
            <div style={{width:'100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <div style={{textAlign:'center'}}>
                <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
                <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
            </div>
        </div>
    );
}

export default checkoutSummary;