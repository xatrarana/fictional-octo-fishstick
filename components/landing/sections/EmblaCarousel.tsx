'use client';
import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Banner } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';

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
          {slides && slides.length > 0 && slides?.map((slide,index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number relative">
                {/* @ts-check */}
                <img className='rounded-md' src={slide.imageUrl} alt={slide.title} />
                <div className='absolute bottom-3 text-white'>
                    <h3 className='text-sm'>{slide.title}</h3>
                </div>
              </div>
            </div>
          ))}

          {
            slides && slides.length === 0 && (
              <div className="embla__slide">
                <div className="embla__slide__number">
                <Skeleton className="h-full w-full" />
                </div>
              </div>
            )
          }
        </div>
      </div>
    </section>
  )
}

export default EmblaCarousel
