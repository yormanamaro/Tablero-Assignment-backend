import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import {  Link, useNavigate } from 'react-router-dom';
import { useEffect } from "react";


const LoginPages = () => {

  const {register, handleSubmit, formState: {errors}} = useForm();
  const {signin, errors: signinErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-lg">    
        {
          signinErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
              {error}
            </div>
          ))
        }
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

        <p className="flex gap-x-2 justify-between">
          Don&#39;t have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
        </p> 
      </div>
    </div>  
  )
}

export default LoginPages