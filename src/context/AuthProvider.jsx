import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import axiosSecure from "../../axios/axiosSecure";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (email, password, name) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    }
    setLoading(false);
    return result;
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleLoginUser = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
  //     try {
  //       setUser(currentUser);

  //       if (currentUser) {
  //         const res = await axiosSecure.get(`/usersRole/${currentUser.email}`);
  //         setRole(res.data.role);
  //       }
  //     } catch (error) {
  //       setUser(null);
  //       console.log("error setting user", error);
  //     }
  //     setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setUser(currentUser);

        if (currentUser) {
          // get JWT token first
          const tokenRes = await axiosSecure.post("/jwt", {
            email: currentUser.email,
          });

          const token = tokenRes.data.token || tokenRes.data;
          localStorage.setItem("access-token", token);

          // now call protected route
          const roleRes = await axiosSecure.get(
            `/usersRole/${currentUser.email}`,
          );

          setRole(roleRes.data.role);
        } else {
          localStorage.removeItem("access-token");
          setRole(null);
        }
      } catch (error) {
        console.log("error setting user", error);
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    loading,
    createUser,
    loginUser,
    logOutUser,
    googleLoginUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
