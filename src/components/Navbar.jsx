import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
const Navbar = () => {
  return (
    <div>
      <nav className='bg-gray-800 flex text-sky-500 min-h-10 justify-between md:max-w-[100vw] items-center p-3'>
        <div className="logo font-bold">Slavery</div>
        <ul className='md:flex justify-center hidden md:gap-9 md:mx-2 items-center'>
          <li className='hover:font-bold transition-all'>Home</li>
          <li className='hover:font-bold transition-all'>Tasks</li>
          <li className='hover:font-bold transition-all'>Completed</li>
          <li className='hover:font-bold transition-all'>Register</li>
          <li className='hover:font-bold transition-all'>Login</li>
        </ul>
        <GiHamburgerMenu className="md:hidden" />
         
      </nav>
    </div>
  )
}

export default Navbar
