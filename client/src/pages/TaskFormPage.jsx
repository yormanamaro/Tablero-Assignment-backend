// Aqui es donde el usuario ya loguiado va a crear un ofrmulario.
import { useForm } from "react-hook-form"
import { useTasks } from "../context/TasksContext";


const TaskFormPage = () => {

  const {register, handleSubmit} = useForm()
  const {createTask} = useTasks();

  const onSubmit = handleSubmit((data) => {
    createTask(data);
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