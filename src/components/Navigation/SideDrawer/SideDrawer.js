import React from 'react'
import Logo from './../../Logo/Logo'
import NavItems from './../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import BackDrop from './../../UI/BackDrop/BackDrop'
import Aux from './../../../hoc/Auxiliary/Auxiliary'

const sideDrawer = (props) => {

   let attachedClasses = [classes.SideDrawer, classes.Close]
   if (props.open) {
      attachedClasses = [classes.SideDrawer, classes.Open]
   }

   return(
      <Aux> 

         <BackDrop show={props.open} closed={props.closed}/>
         <div className={attachedClasses.join(' ')}>
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