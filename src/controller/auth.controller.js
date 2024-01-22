// Este archivo va a permitir crear peticiones mediante funciones
import User from '../models/user.models.js'; // importamos nuestro modelo de carga de usuarios la forma en que se van a requerir
import bcrypt from 'bcryptjs'; // Con esta libreria lo que buscamos es excriptar los password para seguridad
//import jwt from 'jsonwebtoken'; // Esto lo que hace es validar cada peticion que se vaya hacer al back
import { createAccesToken } from '../libs/jwt.js'; // Ya no importamos jwt como arriba sino que nos traemos la funcionk creada en la carpeta libs.

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
      const token =  await createAccesToken({ id: userSaved._id }); // Le pasamos el valor que queremos crear que es el usuario que acabamos de crear
      res.cookie('token', token) // Se devuelve al usuario. (Pero ademas se le pasa por una coockie para que el front no tenga que hacer eso directamente en el navegador)
      res.json({ // Esto es lo que mongo va a regresar al fronted o el usuario.
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createAt: userSaved.createdAt,
        updateAt: userSaved.updatedAt,
      });

      // ESTA ES LA REPUESTA YA PASANDO TOKEN Y COOKIES: /// 2DA FORMA /// Y LA OPTIMA (ESTA FUNCION SE PASA A CARPETA LIBS)

      // Se pasa por la validacion del token

      //jwt.sign({ // se crea el token
      //  id: userSaved.id,
      //}, 
      //"secret123",
      //{
      //  expiresIn: "1d"
      //},
      //(err, token) => {
      //  if (err) console.log(err);
      //  res.cookie('token', token) // Se devuelve al usuario. (Pero ademas se le pasa por una coockie para que el front no tenga que hacer eso directamente en el navegador)
      //  res.json({
          //message: "User created successfully" // Con esto respondes 
        //})
      //}
      //);



      // ORIGINALMENTE COMO FUE AL INICIO Y SIN PASAR TOKEN NI COOKIES: /// 1ERA FORMA ////

      //res.json({ // Con eso lo que se hace es que el backend regrese al front el usuario guardado.
      //  id: userSaved.id,
      //  username: userSaved.username,
      //  email: userSaved.email,
      //  createAt: userSaved.createAt,
      //  updateAt: userSaved.updateAt,
      //}) 


    } catch (error) {
      res.status(500).json({ message: error.message }); // para que le muestre el error al usuario
    }


    //console.log(newUser);
    // console.log(email, password, username);
    //res.send('registrando')
}; 


export const login = (req, res) => res.send("login"); // de momento solo van a responder un texto res.send("register")

