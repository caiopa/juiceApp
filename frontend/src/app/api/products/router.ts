import { typeRegisterSchema } from "@/zodSchemas/schemas";

const loginURL = 'http://localhost:3001/products';


export async function getProducts(token: any): Promise<any>{
  const res = await fetch(loginURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    },

   });
  
   const data = await res.json();
  return data  

  }

const registerURL = 'http://localhost:3001/products';

export async function registerProduct(body: any): Promise<any>{
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