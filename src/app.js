// Aqui inicializamos el servidor con express lo configuramos

import express from "express"; // importamos la libreria de express para cojstruir el server
import morgan from "morgan"; // importamos morgan  para escuchar las peticiones

const app = express(); // ese app va hacer referencia al servisor.

app.use(morgan('dev')); // Se indica a la app que use la app morgar con su configuracion dev.
// esa configuracion dev es para que muestre un mensaje corto en consola.

export default app; // Es para decirle que ya inicializo app y lo exporte.


// Esto va para el file de index.js que es quien va arrancar el servidor:
//app.listen(3000) // Aqui se dice app quiero que escuches el puerto 3000
//console.log("Server on port", 3000);
// prueb

