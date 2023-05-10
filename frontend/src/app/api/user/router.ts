import { typeRegisterSchema } from "@/zodSchemas/schemas";

const loginURL = 'http://localhost:3001/login';


export async function getUser(body: {email: string, password: string}): Promise<any>{
  const res = await fetch(loginURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
   });
  
   const data = await res.json();

  return data  

  }

const registerURL = 'http://localhost:3001/register';

export async function registerUser(body: typeRegisterSchema): Promise<any>{
  const res = await fetch(registerURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
   });
  
   const data = await res.json();

  return data  
  }