import { useForm } from 'react-hook-form'; // importamos la libreria de formularios 
import { useAuth } from '../context/AuthContext';


const RegisterPage = () => {

  const { register, handleSubmit } = useForm(); // inicializamos la libreria de formularios de react  con su metodo register
  const { signup, user } = useAuth();

  console.log(user);

  const onSubmite = handleSubmit(async (values) => {
      signup(values);
    })

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>

      <form onSubmit={onSubmite}>
        <input type="text" placeholder='Username' {...register("username", {required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
        <input type="email" placeholder='Email' {...register("email", {required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'  />
        <input type="password" placeholder='Password' {...register("password", {required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
        <button type='submit'>
          Register
        </button>
      </form>

    </div>
  )
}

export default RegisterPage