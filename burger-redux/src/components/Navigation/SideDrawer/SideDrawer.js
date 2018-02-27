import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';


const sideDrawer=(props)=>{
    //only shown on small screen
    //className='SideDrawer Close' or 'SideDrawer Open'
    let attachClasses=[classes.SideDrawer,classes.Close];
    if(props.open){
        attachClasses=[classes.SideDrawer,classes.Open];
    }
    return (
        <Aux>
            {/* show Backdrop together with Sidedrawer */}
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachClasses.join(' ')} onClick={props.closed}> 
            {/* onClick on the sidedrawer itself closes the it when jumping to other pages */}
                <div className={classes.Logo}><Logo /></div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;