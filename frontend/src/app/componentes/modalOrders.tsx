
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


type ModalProps = {
  onClose: () => void;
};

export default function ModalOrders({ onClose }: ModalProps) {
  const router = useRouter();

  const handleCloseClick = (event: any /* Event */) => {
    const target = event.target;
    // Verifica se o clique foi fora do conteúdo do modal
    if (target.classList.contains('bg-gray-500')) {

      onClose();
    }
  };
  
  return (
    <div
      className={`z-10 fixed top-50 inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center`}
      onClick={handleCloseClick}
    >
      <div className="z-40 bg-white text-black w-11/12 h-5/6 rounded-lg text-center flex flex-col items-center">
        <p className="text-lg font-bold mb-4 w-full bg-red-100">Finalizar Pedido</p>
         <button className="mt-4 bg-red-700 w-full" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
