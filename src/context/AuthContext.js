import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

//create auth context
const AuthContext = React.createContext()

export function useAuth(){
    //function to allow usage of auth context using userAuth Hook
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    // user state to handle currentUser
    const [ currentUser, setCurrentUser ] = useState()
    
    //signup function with uses email and password arguement to return a promise
    function signup(email, password) {
       return auth.createUserWithEmailAndPassword(email, password)
    }

    //useEffect to avoid setUser method to run on render [ ] ensure it runs only one
    useEffect(() =>{
    //method backed with firebase to set user
        const unsubscribe = auth.onAuthStateChanged(user => {
            // this function return a method to unsubscribe on Auth State Chnage
            setCurrentUser(user)
        })

        return unsubscribe
        // unsubscribe from event listener
    }, [])


    const value = {
        // infomation provided with authentication
        currentUser,
        signup
    }

  return (
    // context
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
