// Este archivo va a permitir crear peticiones mediante funciones
import User from '../models/user.models.js'; // importamos nuestro modelo de carga de usuarios la forma en que se van a requerir

export const register = async ( req, res) => { // esto es lo que va a tomar la app de la info del usuario para guardar en la base de datos en el registro y esto lo hace en formato json
    const { email, password, username } = req.body; 

    try { // Se colocan dentro de un try/catch la funcion de creacion y guardado del usuario que la app me indique de existir algun error 
      const newUser = new User({ // esto lo que hace es crear un nuevo usuario en la BD tomando como referencia los datos ingresados por usuario y del modelo creado
        username: username,
        email: email,
        password: password
      })
  
      // ahora luego de que el usuario esta creado con su id se guarda en la bd
  
      await newUser.save() // como es una funcion asincrona debe ir con async y await la funcion que lo contiene
    } catch (error) {
      console.log(error);
    }


    //console.log(newUser);
    // console.log(email, password, username);
    res.send('registrando')
}; 


export const login = (req, res) => res.send("login"); // de momento solo van a responder un texto res.send("register")

