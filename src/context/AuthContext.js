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
    const [loading, setLoading] = useState(true)
    
    //signup function with uses email and password arguement to return a promise
    function signup(email, password) {
        // change this function to connect to server
       return auth.createUserWithEmailAndPassword(email, password)
    }

    //Log in function that takes in email and password again
    function login(email, password) {
        // change this function to connect to server
        return auth.signInWithEmailAndPassword(email, password)
    }

    //useEffect to avoid setUser method to run on render [ ] ensure it runs only one
    useEffect(() =>{
    //method backed with firebase to set user
        const unsubscribe = auth.onAuthStateChanged(user => {
            // sets initial state to false
            setLoading(false)
            // this function return a method to unsubscribe on Auth State Change
            setCurrentUser(user)
        })

        return unsubscribe
        // unsubscribe from event listener
    }, [])


    const value = {
        // infomation provided with authentication
        currentUser,
        login,
        signup
    }

  return (
    // context
    // sets condition not to render children if not loading
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
