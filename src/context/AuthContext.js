import React, { useContext, useState } from 'react'

//create auth context
const AuthContext = React.createContext()

export function useAuth(){
    //function to allow usage of auth context using userAuth Hook
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    // user state to handle currentUser
    const [ currentUser, setCurrentUser ] = useState()

    const value = {
        // infomation provided with authentication
        currentuser
    }

  return (
    // context
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
