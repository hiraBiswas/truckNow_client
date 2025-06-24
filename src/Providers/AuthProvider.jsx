import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/UseAxiosPublic"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const createUser = (name, image, type, email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .catch(error => {
        Toast.error(error)
        console.error("Authentication Error:", error);
        throw error; // Re-throw the error to propagate it further
      });
  };


  const signInWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    // Make sure to return the promise here
    return signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
      });
  };


  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        if (currentUser) {
            // get token and store client
            const userInfo = { email: currentUser.email };
            axiosPublic.post('/jwt', userInfo)
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
        }
        else {
            // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
            localStorage.removeItem('access-token');
            setLoading(false);
        }
        
    });
    return () => {
        return unsubscribe();
    }
}, [axiosPublic])

  const authInfo = {
    user,
    createUser,
    logOut,
    signIn,
    loading,
    signInWithGoogle,
   
  };
  <ToastContainer></ToastContainer>

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};
export default AuthProvider