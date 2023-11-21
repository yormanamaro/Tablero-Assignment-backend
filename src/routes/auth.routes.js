// Este archivo va a englobar todas nuestras rutas de autenticacion ( login, resgister, perfiles y mas).

import { Router } from "express"; // Nos traemos la funcion de creacion de rutas de express.
import { login, register } from "../controller/auth.controller.js"; // importamos las funciones de controller para hacer las peticiones.


const router = Router();

router.post('/register', register);
router.get('/login', login);

export default router;