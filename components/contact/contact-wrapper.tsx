import React, { Suspense } from 'react'
import { ContactSideBar } from './contact-side-bar'
import dynamic from 'next/dynamic'

const MapWrapper = dynamic(() => import('./map-wrapper'), {ssr: true})



const ContactWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='space-y-6'>
    <div className='grid grid-cols-1 md:lg:grid-cols-2 p-2 gap-2'>
        <div className=''>
            <ContactSideBar className='border-none' />
        </div>
        <div className='flex flex-1'>
            {children}
        </div>
    </div>
    <div>
      <Suspense fallback={<MapLoader/>}>
      <MapWrapper src={"https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d28261.96994459605!2d85.29442723022461!3d27.694236789622686!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19d0b529e7d3%3A0x20e7cc2e08867f!2sAarshia%20Infotech%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1721216739616!5m2!1sen!2snp"}/>
      </Suspense>
    </div>
    </div>
  )
}

export default ContactWrapper


const MapLoader = () => {
  return <span className="loading loading-spinner loading-lg"></span>
}