import React from 'react'
import SiteLayout from './site-layout'
import { CarouselWrapper } from '@/components/landing/sections'


const SiteRender = () => {
  return (
    <SiteLayout>
      <section className=''>
        <div className=''>
          <CarouselWrapper  />
        </div>
      </section>
    </SiteLayout>
  )
}

export default SiteRender