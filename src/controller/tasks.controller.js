// Este file va a manejar todos los controladores de las rutas de tareas. (task).

import Task from '../models/task.model.js'; // Nos traemos el esquema de modelos creados para task.


////
export const getTasks = async (req, res) => { // para obtener varias tareas
  const tasks = await Task.find() // lo que se hace es que desde Task se hace una peticion (find) para que traiga todas las tareas
  res.json(tasks); // y esta es la respuesta en json.
};

////
export const createTask = async ( req, res) => { // Recordemos que esta es para crear el controlador para crear tareas.
  const { title, description, date } = req.body  // Esto es lo que se va a recibir del reques body

  console.log(req.user);

  const newTask = new Task({ // aqui se crea la nueva tarea (newTask)
    title,
    description,
    date,
    user: req.user.id
  });
  const savedTask = await newTask.save(); // aqui lo guardamos en la base de datos
  res.json(savedTask); // aqui lo guardamos
};

////
export const getTask = async ( req, res) => { // para obtener uno solo
  const task = await Task.findById(req.params.id) // aqui se va a obtener pero a raiz de un id 
  if (!task) return res.status(404).json({ message: 'Task not found' }) // aqui se hace la pregunta de si consiguio algo o no.
  res.json(task);
};

////
export const deleteTask = async (req, res) => { // para eliminar tareas
  const task = await Task.findByIdAndDelete(req.params.id) // aqui al igual que el anterior lo va a obtener y lo va a eliminar 
  if (!task) return res.status(404).json({ message: 'Task not found' }) // aqui se hace la pregunta de si consiguio algo o no.
  res.json(task);
};

////
export const updateTask = async (req, res) => {  // aqui no se va a ir solo por el parametro de busqueda (id) sino que tambbien por los nuevos datos (req.body).
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });  
  if (!task) return res.status(404).json({ message: 'Task not found' }) // pregunta de si hay o no tareas nuevas 
  res.json(task);
};



