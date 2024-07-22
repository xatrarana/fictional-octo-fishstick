'use client';
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Banner } from '@prisma/client';

type PropType = {
  slides: Banner[] | null
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()])

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides?.map((slide,index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number relative">
                <img className='rounded-md' src={slide.imageUrl} alt={slide.title} />
                <div className='absolute bottom-3 text-white'>
                    <h3 className='text-sm'>{slide.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
