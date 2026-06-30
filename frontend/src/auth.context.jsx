// context means we take the data from localstorage (userId, token) and make it available for every page/ component

import react from 'react';
import { useState,useEffect,createContext,useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () =>{
    return useContext(AuthContext);
};

export const AuthProvider = ({children}) =>{
    const[currentUser,setCurrnetUser] = useState(null);

    // check if use if login or not , if then store its value
    useEffect(()=>{
        const userId = localStorage.getItem('userId');
        // if available , store
        if(userId){
            setCurrnetUser(userId);
        };
    },[]);

    const value = {
        currentUser,setCurrnetUser
    };

    return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}