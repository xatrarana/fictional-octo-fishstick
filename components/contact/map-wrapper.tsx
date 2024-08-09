import React from 'react'

type MapWrapperProps = {
    src: string
}
const MapWrapper = ({src}:MapWrapperProps) => {
  return (
    <iframe src={src}  className='border-0 w-full mb-5 rounded-md h-[40vh] md:lg:h-[70vh]' allowFullScreen  loading="lazy"></iframe>
  )
}

export default MapWrapper