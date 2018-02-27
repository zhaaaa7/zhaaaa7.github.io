import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';


//show the order summary in the modal after clicking "Order Now" button
const orderSummary=(props)=>{
    const ingredientSummary=Object.keys(props.ingredients).map(igKey=>{
        return (
            <li key={igKey} > 
                <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]} 
            </li>);
    });

    return(
        <Aux>
            <h3>Order Details:</h3>
            <ul>
                {ingredientSummary}
            </ul>
            <p style={{color:'red'}}>Total Price: {props.price.toFixed(2)}</p>
            <Button clicked={props.purchaseCanceled} btnType={"Danger"}>Cancel</Button>
            <Button clicked={props.purchaseContinued} btnType={"Success"}>Continue</Button>

        </Aux>
    );
    

};

export default orderSummary;