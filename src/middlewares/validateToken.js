// ESTO ES UN MIDELWARE PORQUE SON FUNCIONES QUE SE EJECUTAN ANTES DE QUE LLEGUEN A LAS RUTAS.
import jwt from 'jsonwebtoken'; // Esto es para cuandi si existe un token que concuerde hay que verificarlo
import { TOKEN_SECRET } from '../configEnv.js';

export const authRequired = (req, res, next) => { // Para que esta funcion sea un midelware debe tener esos 3 oparametros (req, res, next)
  const { token } = req.cookies // este Token se obtiene instalando la libreria cookie-parser como dependencia de desarrollo
  if (!token) // Esta la validacion si el token no pasa la validacion 
    return res.status(401).json({ message: "No token, authorization denied"});

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) return res.status(401).json({ message: "invalid token"});

      req.user = user; // Significa que del usuario que estoy validando se va a guardar todo dentro de reques user.

      next(); // esto es para que el sistema avance al siguiente paso.
    
    });

};