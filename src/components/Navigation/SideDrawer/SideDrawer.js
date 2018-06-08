import React from 'react'
import Logo from './../../Logo/Logo'
import NavItems from './../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'

const sideDrawer = (props) => {
   

   
   return(
      <div className="classes.SideDrawer">
         <Logo />
         <nav>

            <NavItems />
         </nav>

      </div>
   )
}

export default sideDrawer