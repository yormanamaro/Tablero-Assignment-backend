import { useForm } from "react-hook-form";


const LoginPages = () => {

  const {register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = handleSubmit(data => {
    console.log(data);
  })

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-lg">
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={onSubmit}>
          <input type="email" placeholder='Email' {...register("email", {required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'  />
            {
              errors.email &&(
                <p className='text-red-500'>
                  Email is required
                </p>
                )}

          <input type="password" placeholder='Password' {...register("password", {required: true })} className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
            {
              errors.password &&(
                <p className='text-red-500'>
                  Password is required
                </p>)}

          <button type='submit'>
            Login
          </button>

        </form>
      </div>
    </div>  
  )
}

export default LoginPages