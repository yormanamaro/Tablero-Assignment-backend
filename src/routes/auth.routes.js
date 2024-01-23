// Este archivo va a englobar todas nuestras rutas de autenticacion ( login, resgister, perfiles y mas).

import { Router } from 'express'; // Nos traemos la funcion de creacion de rutas de express.
import { login, register, logout } from '../controller/auth.controller.js'; // importamos las funciones de controller para hacer las peticiones.


const router = Router(); // llamamos a la funcion Rauter y lo guardamos dentro de una constante llamada rauter.

router.post("/register", register); // Se crea ruta para subir cosas y le pasamos las funciones creadas en auth.controller
router.post("/login", login); // y se crea ruta para llamar cosas y le pasamos la funcion creada en auth.controller
router.post("/logout", logout); // se crea la ruta de salida de secion de la app

export default router;