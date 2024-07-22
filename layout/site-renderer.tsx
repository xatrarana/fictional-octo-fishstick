import React from 'react'
import SiteLayout from './site-layout'
import { CarouselWrapper } from '@/components/landing/sections'
import EmblaCarousel from '@/components/landing/sections/EmblaCarousel'
import { getBanners } from '@/actions/banner'


const SiteRender = async () => {
 const response = await getBanners()
  return (
    <SiteLayout>
      <section className=''>
        <div className=''>
          {/* <CarouselWrapper  /> */}
          <EmblaCarousel slides={response}/>
        </div>
      </section>
    </SiteLayout>
  )
}

export default SiteRender