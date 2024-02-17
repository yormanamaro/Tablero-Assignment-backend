// Aqui lo que se va hacer es agregar la funcion que va a recibir los datos y los va a enviar tomados de authCVontroller.js.
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../configEnv.js';

export function createAccessToken(payload) { // Se ingresa todo el codigo de token dentro de una funcion propia
  return new Promise((resolve, reject) => { // Todo esto se encierre dentro de una promise para que nos indique si esta bein o mal. en algun momento
    jwt.sign( // se crea el token con su metodo sign.
      payload, // recibe un payload ya no es necesario como antes con un id: userSaved.id, 
      TOKEN_SECRET, // Se asocia la llave para poder crear un token.
        {
          expiresIn: "1d",
        },
        (err, token) => {
          if (err) reject(err) // Si resolvio mal regresa el error
          resolve(token) // Pero si resolvio bien nos regresa el token.
        }
      );
  });
}
