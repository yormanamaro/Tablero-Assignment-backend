// Se crearan las estructuras de los datos para interpretacion de mongodb.(que modelo va a tener)

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String, // se define el tipo de dato que va a requerir
    require: true, // Se define si va a se un dato un dato obligatorio.
    trim: true, // Esto lo que va hacer es quitar los espacios en blanco que tenga un nombre de usuario
  },
  email: {
    type: String, // se define el tipo de dato que va a requerir
    require: true, // Se define si va a se un dato un dato obligatorio.
    trim: true, // Esto lo que va hacer es quitar los espacios en blanco que tenga un nombre de usuario
    unique: true, // para que cada email sea unico y no lo puedan repetir usuarios. (para que el email sea unico)
  },
  password: {
    type: String, // se define el tipo de dato que va a requerir
    require: true, // Se define si va a se un dato un dato obligatorio.
  }, 
},
  {
    timestamps: true, // Para guardar la fecha en que se creo y la ultima fecha en que se actualizo este un dato 
  }
);

// Esto quiere decir que me va a guardar todos los datos en mongo en User basados en el schema creado userSchema
export default mongoose.model("User", userSchema); // con esto vamos a interactuar con la base de datos (sus metodos).


