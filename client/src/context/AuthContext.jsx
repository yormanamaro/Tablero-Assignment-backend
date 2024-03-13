// Con este file lo que vamos hacer es crear un componente que va a englobar a todo y poder compartior los datos por todos los componentes.

import { createContext, useState, useContext } from 'react';
import { registerRequest } from '../api/auth'; // importamos la autenticacion desde la api

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


  return (<AuthContext.Provider value={{
      signup,
      user,
      isAuthenticated,
      errors
    }}>{children}</AuthContext.Provider>
  ); 
};