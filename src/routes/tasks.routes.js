import { Router } from 'express';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router(); // lo arrancamos.

router.get('/tasks', authRequired, (req, res) => res.send('tasks'));

export default router;