'use client'
import Button from '@/app/componentes/button';
import { useForm } from "react-hook-form";
import { registerSchema, typeRegisterSchema } from '@/zodSchemas/schemas';
import { zodResolver } from '@hookform/resolvers/zod'
import { registerUser } from '../api/user/router';
import { useRouter } from 'next/navigation'


export default function Register() {

  const router = useRouter()

  const { register, handleSubmit, formState: { errors } } = useForm<typeRegisterSchema>({
    mode: 'all',
    resolver: zodResolver(registerSchema)
  });


  function handleRegister(data: typeRegisterSchema,) {
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: "user"
    }
    try {
      // é necessario tratar caso ja exista algun usuario
      registerUser(newUser)
      router.push('/' as string)
      
    } catch (error) {
      console.error("Usuario ja registrado", error);
      
    }
  }

  const handleLogoutClick = () => {
    router.push('/');
  };

  return(
    <div className='h-screen flex flex-col justify-center bg-black'>
    <div className='h-[700px] flex flex-col items-center bg-gray-300 w-80 m-auto rounded-3xl'>
      <h1 className='mt-5 text-black font-bold text-2xl'>Faça seu cadastro</h1>
      <form onSubmit={handleSubmit(handleRegister)} className='flex flex-col w-full mt-5'>
        <div className='flex flex-col w-full mb-4'>
          <label htmlFor="name" className='ml-3 text-black font-semibold'>Nome:</label>
          <input
            className='w-11/12 m-auto border rounded-md px-3 py-2 mt-2'
            {...register('name')}
            type="text"
            placeholder="Digite seu nome"
            id="name"
          />
          {errors?.name?.message && (
            <p className='text-red-500 mt-1 ml-3 '>{errors.name.message}</p>
          )}
        </div>
        <div className='flex flex-col w-full mb-4'>
          <label htmlFor="email" className='ml-3 text-black font-semibold'>E-mail:</label>
          <input
            className='w-11/12 m-auto border rounded-md px-3 py-2 mt-2'
            {...register('email')}
            type="email"
            placeholder="Digite seu email"
            id="email"
          />
          {errors?.email?.message && (
            <p className='text-red-500 mt-1 ml-3'>{errors.email.message}</p>
          )}
        </div>
        <div className='flex flex-col w-full mb-4'>
          <label htmlFor="password" className='ml-3 text-black font-semibold'>Senha:</label>
          <input
            className='w-11/12 m-auto border rounded-md px-3 py-2 mt-2'
            {...register('password')}
            type="password"
            placeholder="Digite sua senha"
            id="password"
          />
          {errors?.password?.message && (
            <p className='text-red-500 mt-1 ml-3'>{errors.password.message}</p>
          )}
        </div>
        <div className='flex flex-col w-full mb-4'>
          <label htmlFor="confirmPassword" className='ml-3 text-black font-semibold'>Confirmar Senha:</label>
          <input
            className='w-11/12 m-auto border rounded-md px-3 py-2 mt-2'
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirme sua senha"
            id="confirmPassword"
          />
          {errors?.confirmPassword?.message && (
            <p className='text-red-500 mt-1 ml-3'>{errors.confirmPassword.message}</p>
          )}
        </div>
        <div className='w-full flex justify-center'>
          <Button className=" font-sembold px-4 py-2 bg-cyan-800 text-black rounded-md hover:bg-cyan-700 transition-colors" type="submit" value="Registrar" />
        </div>
      </form>
      <p className="mt-4 text-red-700 cursor-pointer text-center border rounded-md py-2 px-4" onClick={handleLogoutClick}>
        Voltar
      </p>
    </div>
  </div>
  
  )
}
