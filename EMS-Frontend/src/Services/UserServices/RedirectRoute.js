import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'
export const RedirectRoute=()=>{
    const auth = localStorage.getItem('loggedInUser')
    
   
    return !auth? <Outlet/>:<Navigate to={'/dashboard'}/>
}

export const AdminRedirect=()=>{
    const auth=localStorage.getItem('loggedInAdmin')

    return !auth? <Outlet/>:<Navigate to={'/admindashboard'}/>
}
export default RedirectRoute