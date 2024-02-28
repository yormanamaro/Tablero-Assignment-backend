// Esta ruta se crea para crear, eliminar o actualizar tareas recordemos que esta app es de u  tablerop de tareas.

import { Router } from 'express'; // importamos express 
import { authRequired } from '../middlewares/validateToken.js';
import { getTasks, getTask, createTask, updateTask, deleteTask } from "../controller/tasks.controller.js";
import { validateSchema } from '../middlewares/validator.middleware.js'; // Importamos la funcion creada para validaciones con zop
import { createTaskSchema } from '../schemas/task.schema.js';


const router = Router(); // Recordemos que debemos ejecutar ese metodo de express (Router);


router.get("/tasks", authRequired, getTasks); // obtener las tareas  

router.get("/tasks/:id", authRequired, getTask); // Para obtener 1 sola tarea.

router.post("/tasks", authRequired, validateSchema(createTaskSchema), createTask); // Esta ruta es para crear tareas

router.delete("/tasks/:id", authRequired, deleteTask) // Para eliminar tarea.

router.put("/tasks/:id", authRequired, updateTask) // Para actualizar una tarea.

export default router;
