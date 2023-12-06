// Este archivo va a permitir crear peticiones mediante funciones
import User from '../models/user.models.js'; // importamos nuestro modelo de carga de usuarios la forma en que se van a requerir
import bcrypt from 'bcryptjs'; // Con esta libreria lo que buscamos es excriptar los password para seguridad
import jwt from 'jsonwebtoken'; // Esto lo que hace es validar cada peticion que se vaya hacer al back

export const register = async ( req, res) => { // esto es lo que va a tomar la app de la info del usuario para guardar en la base de datos en el registro y esto lo hace en formato json
    const { email, password, username } = req.body; 

    try { // Se colocan dentro de un try/catch la funcion de creacion y guardado del usuario que la app me indique de existir algun error 

      const passwordHash = await bcrypt.hash(password, 10) // Esto lo que hace es usar bcryptjs con su metodo hash para el password convertirlo en 10 caractereds aleatorios.

      const newUser = new User({ // esto lo que hace es crear un nuevo usuario en la BD tomando como referencia los datos ingresados por usuario y del modelo creado
        username: username,
        email: email,
        password: passwordHash,
      });
  
      // ahora luego de que el usuario esta creado con su id se guarda en la bd
  
      const userSaved = await newUser.save(); // como es una funcion asincrona debe ir con async y await la funcion que lo contiene

      // Se pasa por la validacion del token
      jwt.sign({ // se crea el token
        id: userSaved.id,
      }, 
      "secret123",
      {
        expiresIn: "1d"
      },
      (err, token) => {
        if (err) console.log(err);
        res.cookie('token', token) // Se devuelve al usuario. (Pero ademas se le pasa por una coockie para que el front no tenga que hacer eso directamente en el navegador)
        res.json({
          message: "User created successfully" // Con esto respondes 
        })
      }
      );

      //res.json({ // Con eso lo que se hace es que el backend regrese al front el usuario guardado.
      //  id: userSaved.id,
      //  username: userSaved.username,
      //  email: userSaved.email,
      //  createAt: userSaved.createAt,
      //  updateAt: userSaved.updateAt,
      //}) 
    } catch (error) {
      console.log(error);
    }


    //console.log(newUser);
    // console.log(email, password, username);
    //res.send('registrando')
}; 


export const login = (req, res) => res.send("login"); // de momento solo van a responder un texto res.send("register")

