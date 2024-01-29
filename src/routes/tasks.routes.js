import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router(); // Recordemos que debemos ejecutar ese metodo de express (Router);

router.get('/tasks', authRequired, (req, res) => res.send('tasks'))

export default router;
