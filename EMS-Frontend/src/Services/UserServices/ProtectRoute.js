import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
export const ProtectRoute=()=>{
    
    const auth = localStorage.getItem('loggedInUser')
    
    return auth? <Outlet/>:<Navigate to={'/'}/>

}
export const AdminProtect=()=>{

    const auth=localStorage.getItem('loggedInAdmin')

    return auth? <Outlet/>:<Navigate to={'/adminlogin'}/>
};