import React from 'react'
import logo from "@/public/logo/triLogo.webp"
import Image from 'next/image'
import ResponsiveBar from './responsive-bar'
const NavBar = () => {
  return (
    <header className='bg-green-800 py-2 px-1'>
      <div className='max-w-7xl flex items-center justify-center lg:justify-start  mx-auto'>
        <Image src={logo} alt="Logo" className='object-cover rounded-sm' width={320} height={100}/>
      </div>
     <div className='max-w-7xl mx-auto mt-2 '>
        <ResponsiveBar/>
     </div>
    </header>

  )
}

export default NavBar