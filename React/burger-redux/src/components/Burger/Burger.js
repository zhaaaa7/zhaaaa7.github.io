import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger=(props)=>{
    //dynamically display ingredients, salad:2, display 2 salad
    let transformedIngredients=Object.keys(props.ingredients).map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,i)=>{ //create an array with the value of the igKey length empty array
            return <BurgerIngredient key={igKey+i} type={igKey}/>;
        });
    }).reduce((arr,el)=>{
        return arr.concat(el); //flaten a array of arrays
    },[]);
    // console.log(transformedIngredients);


    //the initial burger
    if(transformedIngredients.length===0){
        transformedIngredients=<p>Please Select Ingredients</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;