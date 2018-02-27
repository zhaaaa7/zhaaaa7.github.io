import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from "react-redux";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import {updateObject,checkValidity } from '../../../shared/utility';

class ContactData extends Component{
    state={
        orderForm:{
            name:{
                elementType:'input',
                elementCOnfig:{
                    type:'text',
                    placeholder:'Name',
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
            },
            address:{
                elementType:'input',
                elementCOnfig:{
                    type:'text',
                    placeholder:'Address',
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
            },
            zipCode:{
                elementType:'input',
                elementCOnfig:{
                    type:'text',
                    placeholder:'Zipcode',
                },
                value:'',
                validation:{
                    required:true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true
                },
                valid:false,
                touched:false,
            },
            phone:{
                elementType:'input',
                elementCOnfig:{
                    type:'text',
                    placeholder:'Phone Number',
                },
                value:'',
                validation:{
                    required:true,
                    isAmericanPhone:true
                },
                valid:false,
                touched:false,
            },
            delivery:{
                elementType:'select',
                elementCOnfig:{
                    options:[{value:'fastest',displayValue:'Fastest'},
                    {value:'cheapest',displayValue:'Cheapest'}]
                },
                value:'fastest',
                validation:{},
                valid:true
            },

        },
        formIsValid:false,
        loading:false

    };


    orderHandler=(e)=>{
        e.preventDefault();
        const formData={};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value
        }
        const order={
            ingredients:this.props.ings,
            price: this.props.price, //should be calculated on the server in real life
            orderData:formData,
            userId:this.props.userId
        };
        this.props.onOrderBurger(order,this.props.token);
    }

    inputChangedHandler=(e,inputIndentifier)=>{
        // const updatedOrderForm={
        //     ...this.state.orderForm
        // };
        // const updatedFormElement={
        //     ...updatedOrderForm[inputIndentifier]
        // };

        // updatedFormElement.value=e.target.value;
        // updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        // updatedFormElement.touched=true;
        // updatedOrderForm[inputIndentifier]=updatedFormElement;
        const updatedFormElement=updateObject(this.state.orderForm[inputIndentifier],{
            value:e.target.value,
            valid:checkValidity(e.target.value,this.state.orderForm[inputIndentifier].validation),
            touched:true
        });
        const updatedOrderForm=updateObject(this.state.orderForm,{
            [inputIndentifier]:updatedFormElement
        });
        let formIsValid=true;
        for (let inputIndentifier in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIndentifier].valid&&formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});

    }
    render(){
        const formElementsArray=[];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form=(            
        <form onSubmit={this.orderHandler}>
            {formElementsArray.map((formElement)=>(
                <Input key={formElement.id} 
                label={formElement.id}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementCOnfig} 
                value={formElement.config.value}
                touched={formElement.config.touched}
                changed={(e)=>this.inputChangedHandler(e,formElement.id)}
                />
            ))}
            <Button 
            btnType="Success"
            disabled={!this.state.formIsValid}
            clicked={this.orderHandler}>Order</Button>
        </form>);
        if(this.props.loading){
            form=<Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>enter your contact data</h4>
                {form}
                
                
            </div>
        );
    }
}


const mapStateToProps=state=>{
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
};


const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    };
};




export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));