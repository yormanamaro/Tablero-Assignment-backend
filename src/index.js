// Este archivo es el que arranca la aplicacion.

import app from './app.js';
import { connectDB } from './database.js'; // Nos traemos la funcion del file de database.js

connectDB(); // con esto conecto la base de datos
app.listen(4000) // Aqui se dice app quiero que escuches el puerto 3000
console.log("Server on port", 4000);