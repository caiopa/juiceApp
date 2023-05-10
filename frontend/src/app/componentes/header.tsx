import { useState } from 'react';
import Navbar from './nav';

export default function Header() {
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput);
  };


  return (
    <header className="z-10 fixed bg-black text-white w-screen h-[75px] flex flex-col justify-center items-between">
      <div className="flex w-screen items-center justify-between">
        <p className='ml-5'>LOGO</p>
  
        <div className='flex'>
          {showSearchInput && (
            <input
              type="text"

              placeholder="Pesquisar"
              className="bg-gray-100 rounded-full h-[25px] px-1 w-[200px] m-auto text-black"
            />
          )}

          <button
            className="px-2 text-white bg-white-600 rounded-full"
            onClick={handleSearchClick}
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              >
              <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <Navbar />
        </div>
      </div>
    </header>
  );
}
