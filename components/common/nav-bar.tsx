import React from 'react'
import logo from "@/public/logo/triLogo.webp"
import Image from 'next/image'
import ResponsiveBar from './responsive-bar'
import { GetFlashNews } from '@/actions/flash-news'
const NavBar = async () => {
  const flashNews = await GetFlashNews();
  return (
    <header className='shadow-sm py-2 px-1 '>
      {/* <div className='max-w-7xl flex items-center justify-center lg:justify-start  mx-auto'>
        <Image src={logo} alt="Logo" className='object-cover rounded-sm' width={320} height={100}/>
      </div> */}
     <div className='max-w-7xl mx-auto mt-2 flex items-center justify-between relative'>
     <div className=' flex items-center'>
        <Image src={logo} alt="Logo" className='object-cover rounded-sm' width={320} height={100}/>
      </div>
        <ResponsiveBar/>
     </div>
     <div className='flex'>
     <div className="w-full flex items-center overflow-hidden h-8 bg-gradient-to-r from-green-50 to-green-100">
  <div className="animate-marquee flex ">
    {/* <div className="mr-2">
      <p className="text-center text-xs text-green-700 whitespace-nowrap">
      🚧 We're currently working on exciting updates! 🚧.  Stay tuned for new features and improvements. We appreciate your support!.
      </p>
    </div> */}

    {
      flashNews.length > 0 && flashNews.map((news, index) => (
        <div key={index} className="mr-2">
        <p className="text-center text-xs text-green-700 whitespace-nowrap">
          {news.message}
        </p>
      </div>
      ))
    }
   
  </div>
</div>

        <div className='bg-green-800 text-center py-1 px-2'>
            <h5 className='text-sm text-white'>Notice</h5>
          </div>
     </div>
    </header>

  )
}

export default NavBar