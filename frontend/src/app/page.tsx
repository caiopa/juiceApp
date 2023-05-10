'use client'
import Button from '@/app/componentes/button'
import InputWithLabel from '@/app/componentes/input'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'
import { getUser } from './api/user/router';
import { useEffect, useRef, MutableRefObject } from 'react';

export default function Home() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();


  useEffect(() => {
    if (emailRef.current && passwordRef.current) {
      console.log(emailRef.current.value, passwordRef.current.value);
    }
  }, [emailRef, passwordRef]);

  function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    emailRef.current = e.target;
  }

  function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    passwordRef.current = e.target;
  }

  async function handleSubmit(e: React.MouseEvent) {
    e.preventDefault()
    try {
      const user = await getUser({email: emailRef.current!.value, password: passwordRef.current!.value });
      if(user?.messages?.length === 0 || user?.foundUser.name) {
        router.push('/home' as string)
        localStorage.setItem('user', JSON.stringify(user));
      }
    } catch (error) {
      console.log('erro', error)
     }
  }

  function handleRegister(e: React.MouseEvent ) {
    e.preventDefault()
    router.push('/register' as string)
    
  }

  return (
    <div className={styles.mainRegister}>
      <div className={styles.formLoginRegister} >
        <h1 className='text-3xl text-center'>Bem vindo ao Juice Delivery</h1>
        <form className='h-[250px] flex flex-col justify-around'>
          <div className='h-32 flex flex-col justify-around'>
            <InputWithLabel type="email"
              inputRef={emailRef}
              placeholder="Digite seu email"
              label="Email:"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeEmail(e)}
              />

            <InputWithLabel type="password"
              inputRef={passwordRef}
              placeholder="Digite sua senha"
              label="Senha:"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangePassword(e)}
              />
          </div>  
          <div className='flex flex-col h-20 justify-evenly '>
              <Button
                className="border border-orange-800
                hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300"
                type="button"
                value="Entrar"
                onClick={(e: React.MouseEvent) => handleSubmit(e)}/>

              <Button type="button" 
              className="border border-orange-800"
              value="Registar" onClick={(e: React.MouseEvent) => handleRegister(e)}/>
          </div>
        </form>
      </div>
    </div>
  )
}
