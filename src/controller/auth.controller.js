// Este archivo va a permitir crear peticiones mediante funciones
import User from '../models/user.models.js'; // importamos nuestro modelo de carga de usuarios la forma en que se van a requerir
import bcrypt from 'bcryptjs'; // Con esta libreria lo que buscamos es excriptar los password para seguridad
import jwt from 'jsonwebtoken'; // Esto lo que hace es validar cada peticion que se vaya hacer al back
import { createAccesToken } from '../libs/jwt.js'; // Ya no importamos jwt como arriba sino que nos traemos la funcionk creada en la carpeta libs.
import { TOKEN_SECRET } from '../configEnv.js';




///// DE AQUI HACIA ABAJO ES PARA EL REGISTER: ////

export const register = async ( req, res) => { // esto es lo que va a tomar la app de la info del usuario para guardar en la base de datos en el registro y esto lo hace en formato json
    const {email, password, username} = req.body;

    try { // Se colocan dentro de un try/catch la funcion de creacion y guardado del usuario que la app me indique de existir algun error 

      const passwordHash = await bcrypt.hash(password, 10) // Esto lo que hace es usar bcryptjs con su metodo hash para el password convertirlo en 10 caractereds aleatorios.

      const newUser = new User({ // esto lo que hace es crear un nuevo usuario en la BD tomando como referencia los datos ingresados por usuario y del modelo creado
        username,
        email,
        password: passwordHash, // pasamos la encriptacion de la contrasena 
      });
  
      // ahora luego de que el usuario esta creado con su id se guarda en la bd
  
      const userSaved = await newUser.save(); // como es una funcion asincrona debe ir con async y await la funcion que lo contiene
      const token =  await createAccesToken({ id: userFound._id }); // Le pasamos el valor que queremos crear que es el usuario que acabamos de crear.

      res.cookie("token", token) // Se devuelve al usuario. (Pero ademas se le pasa por una coockie para que el front no tenga que hacer eso directamente en el navegador)
      res.json({ // Esto es lo que mongo va a regresar al fronted o el usuario.
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createAt: userSaved.createdAt,
        updateAt: userSaved.updatedAt,
      });
    } catch (error) {
      res.status(500).json({ message: error.message }); // para que le muestre el error al usuario
    }
}; 





///// DE AQUI HACIA ABAJO ES PARA EL LOGIN: ////


export const login = async ( req, res) => { // esto es lo que va a tomar la app de la info del usuario para guardar en la base de datos en el registro y esto lo hace en formato json
  const { email, password } = req.body; // A diferencia del register aqui solo se necesita email y password

  try { // Se colocan dentro de un try/catch la funcion de creacion y guardado del usuario que la app me indique de existir algun error 

    // VALIDANDO SI EL USUARIO EXISTE LOGUIADO
    const userFound = await User.findOne({ email }); // Con este codigo lo que se hace es validar si el password que esta pasando el usuario con la que ya esta registrada. (findOne)
    if (!userFound) return res.status(400).json({ message: "User not found" }); // y aqui esta pasando la condicional de si no es igual nos diga un error
    //


    // EN ESTE PASO VALIDARA LA COMPARACION DE PASSWORD
    const isMatch = await bcrypt.compare(password, userFound.password); // Con el metodo compare usara los datos de userFound su possword y lo compara con el ingresado.
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" }); // Si es diferente indicara error 400 y mensaje.
    //


    const token =  await createAccesToken({ id: userFound._id }); // En este caso va a crear un token del usuario encontrado (userfound)
    res.cookie('token', token) // Se devuelve al usuario. (Pero ademas se le pasa por una coockie para que el front no tenga que hacer eso directamente en el navegador)
    res.json({ // Esto es lo que mongo va a regresar al fronted o el usuario. (En este caso pasandole el userFound) del login
      id: userSaved._id,
      username: userFound.username,
      username: userFound.username,
      createAt: userFound.createdAt,
      updateAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message }); // para que le muestre el error al usuario
  }
};






//// DE AQUI HACIA ABAJO ES PARA EL LOGOUT SALIR DE LA SECION: ////

export const logout = (req, res) => {
  res.cookie("token", "", { // metodo cookie token el valor va a estar vacio
    expires: new Date(0), // es decir que el valor va a estar resetado a 0 
  });
  return res.sendStatus(200); // se envia mensaje de salida de la secion
};





///// DE AQUI HACIA ABAJO ES PARA EL PROFILE: ////

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id)
  if(!userFound) return res.status(400).json({ message: "User not found"});
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  })

  res.send('profile');
}