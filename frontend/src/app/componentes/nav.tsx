import { useState, useEffect } from 'react';
import Modal from './modal';

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = () => {
    if (isMobile) {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Nav para telas maiores que 500 */}
      {!isMobile && (
        <nav className="flex">
          <p>Produtos</p>
          <p className="mx-1">Sobre</p>
          <p>Contatos</p>
          <p className="ml-1">Profile</p>
        </nav>
      )}

      {/* Nav para telas menores que 500 */}
      {isMobile && (
        <nav
          className="w-12 h-12 mr-5 bg-gray-500 rounded-lg flex flex-col items-center justify-center"
          onClick={handleNavClick}
        >
          <span className="w-6 h-0.5 bg-white mb-1"></span>
          <span className="w-6 h-0.5 bg-white mb-1"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </nav>
      )}

      {/* Modal */}
      {isModalOpen && <Modal onClose={handleModalClose} />}
    </>
  );
}
