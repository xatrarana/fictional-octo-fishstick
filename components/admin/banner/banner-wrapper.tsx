import React from 'react'
import {BannerAddDialog} from './banner-form'
import BannerItems from './banner-items'

const BannerWrapper = () => {
  return (
    <div className='space-y-6'>
            <div className='space-y-3 flex justify-end'>
                <BannerAddDialog/>
            </div>
            <div className='space-y-4'>
                <BannerItems/>
            </div>
    </div>
  )
}

export default BannerWrapper