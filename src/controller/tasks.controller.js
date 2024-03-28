// Este file va a manejar todos los controladores de las rutas de tareas. (task).

import Task from '../models/task.model.js'; // Nos traemos el esquema de modelos creados para task.


////
export const getTasks = async (req, res) => { // para obtener varias tareas
  try {
    const tasks = await Task.find({ // lo que se hace es que desde Task se hace una peticion (find) para que traiga todas las tareas
      user: req.user.id // Esto para que me traiga todas las tareas del usuario registrado (solo las de el)
    }).populate('user') // Para traernos todo el resto de la informacion de user.
    res.json(tasks); // y esta es la respuesta en json.
  } catch (error) {
    return res.status(500).json({message: "Something went wrong" });
  }  
};

////
export const createTask = async ( req, res) => { // Recordemos que esta es para crear el controlador para crear tareas.
  try {
    const { title, description, date } = req.body;  // Esto es lo que se va a recibir del reques body

    console.log(req.user);

    const newTask = new Task({ // aqui se crea la nueva tarea (newTask)
      title,
      description,
      date,
      user: req.user.id // Esto es porque queremos que al crear una tarea esta sea guardada a ese usuario. haciendo referencia en su modelo de schema.
    });
    const savedTask = await newTask.save(); // aqui lo guardamos en la base de datos
    res.json(savedTask); // aqui lo guardamos
  } catch (error) {
    return res.status(500).json({message: "Something went wrong" });
  }  
};

////
export const getTask = async ( req, res) => { // para obtener uno solo
  try {
    const task = await Task.findById(req.params.id).populate('user') // aqui se va a obtener pero a raiz de un id 
    if (!task) return res.status(404).json({ message: 'Task not found' }) // aqui se hace la pregunta de si consiguio algo o no.
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }  
};

////
export const deleteTask = async (req, res) => { // para eliminar tareas
  try {
    const task = await Task.findByIdAndDelete(req.params.id) // aqui al igual que el anterior lo va a obtener y lo va a eliminar 
    if (!task) return res.status(404).json({ message: 'Task not found' }) // aqui se hace la pregunta de si consiguio algo o no.
    return res.sendStatus(204); // El 204 es para regresar una respuesta que todo esta ok pero no regresare ningun dato
  } catch (error) {
    return res.status(404).json({ message: "Task not found" })
  }  
};

////
export const updateTask = async (req, res) => {  // aqui no se va a ir solo por el parametro de busqueda (id) sino que tambbien por los nuevos datos (req.body).
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });  
    if (!task) return res.status(404).json({ message: 'Task not found' }); // pregunta de si hay o no tareas nuevas 
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" })
  }  
};



