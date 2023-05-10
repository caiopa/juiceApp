'use client'
import React, { useEffect, useState } from 'react';
import ProductCard from '../../../app/componentes/prodCard';
import { number } from 'zod';
import { useRouter } from 'next/navigation'


export default function ProductList({ products }: any) {
  const [ total, setTotal ] = useState<number>(0)
  const router = useRouter()

  useEffect(() => {
    const cartString = localStorage.getItem('cart') || '';
    if (cartString) {
      const cart = JSON.parse(cartString);
      const cartTotal = cart.reduce((acc: any, item: any) => acc + item.total, 0);
      setTotal((prevTotal: any) => prevTotal + cartTotal);
    }
  }, [setTotal, ]);
  
  const handleClick = () => {
    router.push('/cart')
  }
  
  return (
    <div>
      {products &&
        products?.map((product: any, i: number) => (
          <ProductCard product={product} key={i} setTotal={setTotal} total={total}/>
        ))}

    <button className='fixed bottom-0 right-0 mb-12 mr-12' onClick={handleClick} value={total}>Total: {total}</button>
    </div>
  );
}
