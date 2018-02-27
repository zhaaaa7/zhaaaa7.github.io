import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import {connect} from "react-redux";

class Layout extends Component{

    state={
        showSideDrawer:false
    };

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
        
    }

    sideDrawerOpenHandler=()=>{
        this.setState({showSideDrawer:true});
    }

    render(){
        return (
            <Aux>
                <div>
                    <Toolbar 
                    // isAuth determine the nav items on tool bar
                        isAuth={this.props.isAuthenticated} 
                        drawerOpen={this.sideDrawerOpenHandler} />
                    <SideDrawer 
                        isAuth={this.props.isAuthenticated} 
                        open={this.state.showSideDrawer} 
                        closed={this.sideDrawerClosedHandler}/>
                    
                </div>
                <main  className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }   
}


const mapStateToProps=state=>{
    return {
        isAuthenticated:state.auth.token!==null,
    };
};
export default connect(mapStateToProps)(Layout);