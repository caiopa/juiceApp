
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';


type ModalProps = {
  onClose: () => void;
};

export default function Modal({ onClose }: ModalProps) {
  const router = useRouter();

  const handleCloseClick = (event: any /* Event */) => {
    const target = event.target;
    // Verifica se o clique foi fora do conteúdo do modal
    if (target.classList.contains('bg-gray-500')) {

      onClose();
    }
  };

  useEffect(() => {
  
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem('cart');
    router.push('/');
  };

  return (
    <div
      className={`z-10 fixed top-50 inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center`}
      onClick={handleCloseClick}
    >
      <div className="z-40 bg-white text-black rounded-lg w-screen text-center flex flex-col items-center">
        <p className="text-lg font-bold mb-4 w-full bg-red-100">Menu</p>
        <a href="/home" className="w-min">Produtos</a>
        <a href="/sobre" className="my-2 w-min">Sobre</a>
        <a href="/contatos" className="w-min">Contatos</a>
        <a href="/perfil" className=" mt-2 w-min">Perfil</a>
        <p className="mt-4 text-red-700 cursor-pointer w-min" onClick={handleLogoutClick}>
          Logout
        </p>
        <button className="mt-4 bg-red-700 w-full" onClick={onClose}>
          Fechar
        </button>
      </div>
    </div>
  );
}
