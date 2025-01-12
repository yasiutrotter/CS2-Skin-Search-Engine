import React from 'react';
import Menu02Icon from '../../../public/assets/menu-02-stroke-rounded';
import Cancel01Icon from '../../../public/assets/cancel-01-stroke-rounded';

export const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div>
      <button className='transition duration-300 relative z-100' onClick={() => setIsOpen(!isOpen)}>
        <div className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
          <Menu02Icon />
        </div>
        <div className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <Cancel01Icon />
        </div>
      </button>
      {isOpen && (
        <div className='fixed top-0 left-0 w-64 h-screen bg-ciemny-500 shadow-lg'>
      <button className='transition duration-300 relative z-100' onClick={() => setIsOpen(!isOpen)}>
        <div className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
          <Menu02Icon />
        </div>
        <div className={`absolute transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <Cancel01Icon />
        </div>
      </button>
          <ul className='flex flex-col items-center justify-center h-full'>
            <li className='text-white text-xl py-4'>Home</li>
            <li className='text-white text-xl py-4'>About</li>
            <li className='text-white text-xl py-4'>Contact</li>
          </ul>
        </div>
      )}
    </div>
  );
};