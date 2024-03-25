// Con este file lo que vamos hacer es crear un componente que va a englobar a todo y poder compartior los datos por todos los componentes.

import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, verityTokenRequest } from '../api/auth'; // importamos la autenticacion desde la api
import Cookies from 'js-cookie'; // Nos va a permitir leer la cookies desde el frontend

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]); 
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user); // pasamos los valores tomados desde el usuario.
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      //console.log(error.response);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user)
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);





  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }
        try {
          const res = await verityTokenRequest(cookies.token);
          if (!res.data) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          }  
          
          setIsAuthenticated(true);
          setUser(res.data);
          setLoading(false);
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        }
    }
    checkLogin();
  }, []);





  return (<AuthContext.Provider value={{
      signup,
      signin,
      loading,
      user,
      isAuthenticated,
      errors
    }}>{children}</AuthContext.Provider>
  ); 
};