// Aqui lo que se hace es conectarse con la base de datos mongodb

import mongoose from "mongoose"; // importamos la libreria de mongoose

export const connectDB = async () => { // Se crea una funcion asincrona porque debe esperar una respuesta
  try { // try y el catch por si no pasa se espere el error.
    await mongoose.connect("mongodb://localhost/databaseDB"); // aqui se le especifica a mongoose que se conecte a la direccion tal...
    console.log(">>>> DB is connected") // Se deja un mensaje si la coneccion fue exitosa.
  } catch (error) {
    console.log(error);
  }
};

// Esta funcion debe quedar exportable por eso se agrega la funcion como exportable.