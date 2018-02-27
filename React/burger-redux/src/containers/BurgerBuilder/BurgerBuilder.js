import React, { Component } from 'react';
import {connect} from "react-redux";
import axios from '../../axios-orders';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuilderControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component{
    state={        
        purchasing:false,
    };

    //fetch ingredients data from firebase
    componentDidMount(){
           this.props.onInitIngredients();
    }

    //calculate the quantity of all gredients, if 0, disable the button
    updatePurchaseState(ingredients){
        const sum=Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum>0;
    }

    //onClick Order Now button
    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }else{
            //if the user select the ingredients before sign in, save the '/checkout' as the redirect page after sign in
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push("/auth");
        }
        
    }

    //cancel button on modal
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    //continue button on modal
    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');    
    }

 componentWillUnmount(){
     console.log('buger state', this.props.state);
 }
    render(){
        const disableInfo={...this.props.ings};
        for (let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0 
            //save the info about whether to disable each row of BuildControl
            //i.e unable to click less if the number is 0
        }

        //dislay orderSummary and burger based on the database status
        let orderSummary=null;
        let burger=this.props.error ? <p>Something went wrong</p> : <Spinner />;
        if(this.props.ings){
            burger=(
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <div>
                        <BuilderControls 
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disableInfo}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            price={this.props.price}
                            ordered={this.purchaseHandler}
                            isAuth={this.props.isAuthenticated} //change the text on order button if not signed in
                        />
                    </div>
                </Aux>
            );
            orderSummary=<OrderSummary 
                        ingredients={this.props.ings} 
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.props.price}
                        />;
            
        }
 
                
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>                
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps=state=>{
    return {
        state:state,
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated: state.auth.token
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onIngredientAdded:(ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved:(ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients:()=>dispatch(actions.initIngredients()),
        onInitPurchase:()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath:(path)=>dispatch(actions.setAuthRedirectPath(path))
        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));
