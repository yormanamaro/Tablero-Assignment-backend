// Este archivo va a englobar todas nuestras rutas de autenticacion ( login, resgister, perfiles y mas).

import { Router } from 'express'; // Nos traemos la funcion de creacion de rutas de express.
import { login, register, logout, profile, verifyToken } from '../controller/auth.controller.js'; // importamos las funciones de controller para hacer las peticiones.
import { authRequired } from '../middlewares/validateToken.js'; // importamos el midelware para validar usuarios autenticados.
import { validateSchema } from '../middlewares/validator.middleware.js'; // Importamos la funcion creada para validaciones con zop
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';


const router = Router(); // llamamos a la funcion Rauter y lo guardamos dentro de una constante llamada rauter.

router.post("/register", validateSchema(registerSchema), register); // Se crea ruta para subir cosas y le pasamos las funciones creadas en auth.controller
router.post("/login", validateSchema(loginSchema), login); // y se crea ruta para llamar cosas y le pasamos la funcion creada en auth.controller
router.post("/logout", logout); // se crea la ruta de salida de secion de la app

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile); //  nueva ruta (Ruta protegida y para usuarios autenticados se debe pasar antes de la funcion de profile la funcion de usuarios autenticados )

export default router;