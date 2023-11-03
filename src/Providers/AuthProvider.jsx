import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";


export const AuthContext = createContext()
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null)
    const [loading, setLoading]= useState(true)

    const createUser = (email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
        
    }

    useEffect(()=>{
       const unSubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            
            console.log(currentUser)
            setLoading(false)
        })

        return() =>{
            unSubscribe()
        }
    })

    const signIn =(email, password)=>{
      return  signInWithEmailAndPassword(auth, email, password)
        
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const authInfo={
        user,
        loading,
        createUser,
        signIn,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;