// Aqui es donde el usuario ya loguiado va a crear un ofrmulario.
import { useForm } from "react-hook-form"
import { useTasks } from "../context/TasksContext";
import {useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";

const TaskFormPage = () => {

  const {register, handleSubmit, setValue} = useForm()
  const {createTask, getTask, updateTask} = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue('title', task.title)
        setValue('description', task.description)
      }  
    }
    loadTask();
    },[])

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data)
    } else {
      createTask(data);
    }    
    navigate('/tasks');
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Title" {...register("title")} className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md" autoFocus/>
        <textarea cols="30" placeholder="Descripcion" {...register("description")} className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"></textarea>
        <button>Save</button>
      </form>
    </div>
  )
}

export default TaskFormPage