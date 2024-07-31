import React from 'react'
import 'photoswipe/style.css';
import Image from 'next/image';


const GalleryComp = ({images}:any) => {
  
    
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:lg:gap-x-4 md:lg:p-4 p-2 gap-y-4">
    {images.map((item:any, index:number) => (
      <div key={index} className="relative flex rounded-sm  justify-center overflow-hidden group">
        <a href={item.original} className='rounded-sm' target="_blank" rel="noopener noreferrer">
          <Image
            width={250}
            height={250}
            src={item.original}
            loading='eager'
            alt={item.alt || 'Gallery Image'}
            className="object-cover transition-transform duration-300 transform group-hover:scale-110 rounded-sm"
          />
        </a>
      </div>
    ))}
  </div>
  )
}

export default GalleryComp