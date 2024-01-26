// Aqui inicializamos el servidor con express lo configuramos

import express from 'express'; // importamos la libreria de express para cojstruir el server
import morgan from 'morgan'; // importamos morgan  para escuchar las peticiones
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser'; // Instalamos libreria cookie-parser sirve para covertir la cookie en un objero json
import taskRoutes from './routes/task.routes.js';


const app = express(); // ese app va hacer referencia al servisor. con esto la inicializamos express


/* Midelward */
app.use(morgan('dev')); // Se indica a la app que use la app morgar con su configuracion dev.
// esa configuracion dev es para que muestre un mensaje corto en consola.
app.use(express.json()); // Esto es vital porque lo que va hacer es trasformar las respuestas del usuario en formato json para que express lo pueda interpretar
app.use(cookieParser()); // Esto lo que va hacer es convertir todas las cookies en un opjeto json 

app.use("/api", authRoutes); // esto es para indicar quiero que utilices add rauter, (se le agrega el; prefijo api a la tura de peticiones)
app.use("/api", taskRoutes); // esto es para indicar que quiero que uses esas rutas taskRoutes.


export default app; // Es para decirle que ya inicializo app y lo exporte.


// Esto va para el file de index.js que es quien va arrancar el servidor:
//app.listen(3000) // Aqui se dice app quiero que escuches el puerto 3000
//console.log("Server on port", 3000);
// prueb

