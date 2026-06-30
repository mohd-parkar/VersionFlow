import React, { useId } from 'react';
import { useEffect } from 'react';

import {useNavigate,useRoutes} from 'react-router-dom';

// Pages List
import Dashboard from './components/dashboard/Dashboard';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Profile from './components/user/Profile';

// Auth Context (that we created to see if our user if login or not )
import { useAuth } from './auth.context';

export default ProjectRoutes = ()=> {
    const {currentUser,setCurrentUser} = useAuth();
    const navigate = useNavigate(); // use to re-direction 

    useEffect(()=>{
        // first check is user id available
        const userIdFromStorage = localStorage.getItem('userId');

        // if id available but not login , then we login
        if(userIdFromStorage  && !currentUser){
            setCurrentUser(userIdFromStorage);
        };

        // user not in location , navigate to login
        if(!userIdFromStorage && !["/login","/signup"].includes(window.location.pathname)){
                navigate("/login");
        };

        // if login already and still tries to go to login/signup , re-direct to home page
        if(userIdFromStorage && window.location.pathname == "/login" ){
            navigate("/");
        };
    },[currentUser,navigate,setCurrentUser]); // if anyone of value changes , useEffect gets trigger

    let element = useRoutes([
        {
            path : "/",
            element : <Dashboard/>
        },
        {
            path : "/login",
            element : <Login/>
        },
        {
            path : "/signup",
            element : <Signup/>
        },
        {
            path : "/profile",
            element : <Profile/>
        },
    ]);

    return element;

};


