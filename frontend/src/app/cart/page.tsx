'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import CartCard from '../componentes/cart';
import ModalOrders from '../componentes/modalOrders';
import { useTotalStore } from '@/store/total';


export default function Cart() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { state: { total, cart }, actions: { setValue, addValue, removeValue } } = useTotalStore();

  const router = useRouter()
  /* const handleFinish = () => {
    setIsModalOpen(true);
    const cartString = localStorage.getItem('cart') || '';
    if (cartString) {
      const cart = JSON.parse(cartString);
      cart.map((item: any) => console.log(item));
    }

  }; */
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  /* useEffect(() => {
    const cartTotal = cart.reduce((acc: number, item: any) => acc + item.total, 0) || 0;
    console.log('oi',cartTotal)
    setValue(cartTotal);
  }, [cart, setValue]); */
  

  
  return (
    <div className="min-h-screen flex flex-col text-black justify-center items-center">
      <form className="w-full p-6 rounded-lg shadow-lg bg-white" onSubmit={() => false}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Seu carrinho</h2>
          {cart.length > 0 ? (
            <div className="mt-4 space-y-4">
              {cart.map((item: any, index: number) => (
                <CartCard key={index} item={item} index={index}/>
              ))}
            </div>
          ) : (
            <p>Seu carrinho está vazio</p>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <p className="text-lg font-medium">Total:</p>
          <p className="text-lg font-medium">R${total || 0}</p>
        </div>

        <div className="mt-6">
          <button
            className="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-lg mr-4"
            type="button"
            onClick={() => router.push('/home')}
          >
            Voltar para a página de compras.
          </button>
        </div>

        <div className="mt-6 text-black">
          <h3 className="text-lg font-bold mb-2">Endereço de entrega:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label>
              Endereço:
              <input className="block w-full border-gray-300 rounded-lg shadow-sm mt-1" type="text" />
            </label>
            <label>
              Bairro:
              <input className="block w-full border-gray-300 rounded-lg shadow-sm mt-1" type="text" />
            </label>
            <label>
              Número:
              <input className="block w-full border-gray-300 rounded-lg shadow-sm mt-1" type="number" />
            </label>
            <label>
              Complemento:
              <input className="block w-full border-gray-300 rounded-lg shadow-sm mt-1" type="text" />
            </label>

            <label>
              CEP:
              <input className="block w-full border-gray-300 rounded-lg shadow-sm mt-1" type="number" />
            </label>

            <button
              onClick={(e) => {
                e.preventDefault();
                /* handleFinish(); */
              }}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-lg"
              type="submit"
            >
              Compra
            </button>
            {isModalOpen && <ModalOrders onClose={handleModalClose} />}
          </div>
        </div>
      </form>
    </div>
  );
}
