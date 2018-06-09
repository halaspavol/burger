import React from 'react'
import Logo from './../../Logo/Logo'
import NavItems from './../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import BackDrop from './../../UI/BackDrop/BackDrop'
import Aux from './../../../hoc/Auxiliary'

const sideDrawer = (props) => {



   return(
      <Aux> 

         <BackDrop show={props.open} clicked={props.closed}/>
         <div className={classes.SideDrawer}>
            <div className={classes.Logo}>
               <Logo />
            </div>
            <nav>

               <NavItems />
            </nav>

         </div>
      </Aux>
   )
}

export default sideDrawer