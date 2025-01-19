import React from 'react'
import Logo from '../../../public/assets/Logo'
import { useRouter } from 'next/navigation'

export const Navbar = () => {

  const router = useRouter();
  return (
    <div className='flex items-center justify-center gap-4'>
        <div onClick={() => router.push('/')}  className='cursor-pointer border-2 border-gray-800 flex items-center w-16 h-16 justify-center rounded-full'>
          <Logo className='w-8 h-8'/>
        </div>
        <nav className='inline-block p-2 border-2 text-base border-gray-800 rounded-full'>
            <ul className='flex p-0 m-0'>
                <li className='flex items-center justify-center space-x-2'>
                    <a className='hover:bg-primary-700 rounded-full px-6 py-2 duration-300 ease-in-out'>Home</a>
                    <a className='hover:bg-primary-700 rounded-full px-6 py-2 duration-300 ease-in-out'>Pistols</a>
                    <a className='hover:bg-primary-700 rounded-full px-6 py-2 duration-300 ease-in-out'>Rifles</a>
                    <a className='hover:bg-primary-700 rounded-full px-6 py-2 duration-300 ease-in-out'>Snipers</a>
                    <a className='hover:bg-primary-700 rounded-full px-6 py-2 duration-300 ease-in-out'>Knives</a>
                </li>
            </ul>
        </nav>
    </div>
  )
}