'use client'
import React, { useEffect, useState } from 'react';
import ProductCard from '../../../app/componentes/prodCard';
import { useRouter } from 'next/navigation'
import { useTotalStore } from '../../../store/total'


export default function ProductList({ products }: any) {
  // const [ total, setTotal ] = useState<number>(0)
  const router = useRouter()

  const { state: { total, cart }, actions: { setValue  } } = useTotalStore();

  useEffect(() => {
    // const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length > 0) {
      const cartTotal = cart.reduce((acc: number, item: any) => acc + item.total, 0);
      // setValue(cartTotal);
    }
  }, [total]);
  
/*   const handleClick = () => {
    router.push('/cart')
  }
   */
  return (
    <div>
      {products &&
        products?.map((product: any, i: number) => (
          <ProductCard product={product} key={i} />
        ))}

    <button className='fixed bottom-0 right-0 mb-12 mr-12' onClick={() => router.push('/cart')} value={total}>Total: {total}</button>
    </div>
  );
}
