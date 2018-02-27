import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from './Auth.css';
import * as actions from "../../store/actions/index";
import {updateObject,checkValidity } from '../../shared/utility';



class Auth extends Component {

    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Email',
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false,
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password',
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false,
            },
        },
        isSignup:true
        
    };
    componentDidMount(){
        console.log('did mount',this.props.state);
        //to deal with the user case :trying to redirect to /checkout if actually not building the burger
        if(!this.props.buildingBurger&&this.props.authRedirectPath!=='/'){
            //redirect to '/'
            this.props.onSetAuthRedirectPath();
        }


    }

    componentDidUpdate(){
        console.log('did update',this.props.state);

    }

    componentWillUnmount(){
        console.log('will unmount',this.props.state);

    }
    

    inputChangedHandler=(event,controlName)=>{
        const updatedControls=updateObject(this.state.controls,{
            [controlName]:updateObject(this.state.controls[controlName],{
                value:event.target.value,  //update input value with user input
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            })
        });
        
       
        this.setState({controls:updatedControls});
    }
    

    
    //to sign in/up with user input email and password
    submitHandler=(event)=>{
        //prevent page reload
        event.preventDefault();        
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }
    
    //swithch between sign up and sign in
    switchAuthModeHandler=()=>{
        //use function form to avoid synchronous of setState()
        this.setState(prevState=>{
            return {isSignup:!prevState.isSignup};
        });

    }

    
    render(){
        const formElementsArray=[];
        //change the state[controls] object into an array of object
        for (let key in this.state.controls){
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }

        let form=formElementsArray.map(formElement=>(
            <Input key={formElement.id} 
                label={formElement.id}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                touched={formElement.config.touched}
                changed={(e)=>this.inputChangedHandler(e,formElement.id)}
                />
 
        ));

        //show spinning when sending data
        if (this.props.loading){
            form =<Spinner />
        }

        //show error message sent back from firebase if any
        let errorMessage=null;
        if(this.props.error){
            errorMessage=(
                <p>{this.props.error.message}</p>
            );
        }

        //redirect to '/checkout' or '/' based on the entering path
        //this is set in BurgerBuilder.js, purchaseHandler()

        
        let authRedirect=null;
        if (this.props.isAuthenticated){
            authRedirect=<Redirect to='/checkout' />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">Submit </Button>
                </form>
                <p>{this.state.isSignup?'Already has account?':'Has no account?'}</p>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}> {this.state.isSignup?'Sign In':'Sign Up'}</Button>
            </div>
           
        );
    }
}


const mapStateToProps = state => {
    return {
        state:state,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( actions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch( actions.setAuthRedirectPath( '/' ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );