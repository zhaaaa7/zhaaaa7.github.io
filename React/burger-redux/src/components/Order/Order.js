import React from 'react';
import classes from './Order.css'

//imported by Order container
//display each order retrieved fron firebase
const order =(props)=>{
    const ingredients=[];
    //turn an object of objects into an array of objects, so as to use map function
    for (let ingredientName in props.ingredients){
        ingredients.push({
            name:ingredientName,
            amount:props.ingredients[ingredientName]
        });
    }

    const ingredientOutput=ingredients.map(ig=>{
        return <span style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px',
            boxShadow:'0 2px 3px #fff',

        }}
        key={ig.name}>{ig.name}: {ig.amount}  </span>
    });
    return(
        <div className={classes.Order}>
        <p>Ingredients: {ingredientOutput}</p>
        <p>Price:{Number.parseFloat(props.price).toFixed(2)}</p>
        {/* parse string to number and limit it to 2 digits */}
    </div>
    );
    
};
export default order;