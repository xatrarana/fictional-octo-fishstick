'use client';
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";

type CarouselWrapperProps = {

  id: number;
  title: string;
  body: string;
  imageUrl: string;
  docs: string;
}

export default function CarouselWrapper() {

  const [index, setIndex] = useState(0);
  const [bootstrapItems, setBootstrapItems] = useState<CarouselWrapperProps[]>([]);

  useEffect(() => {
    fetch('/Items.json')
      .then(response => response.json())
      .then(data => {
        setBootstrapItems(data.items.bootstrap)
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);
  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      {bootstrapItems && bootstrapItems.length > 0 && (
        <Carousel activeIndex={index} onSelect={handleSelect}>
          {bootstrapItems && bootstrapItems.length > 0 && bootstrapItems.map((item) => (
            <Carousel.Item className="h-[80lvh]" key={item.id} interval={4000}>
              { /* eslint-disable-next-line padded-blocks */}
              <Image src={item.imageUrl} width={100} height={100} className={'rounded-md h-full  w-full object-cover'} alt="slides" />
              <Carousel.Caption >
                <h3>{item.title}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}

        </Carousel>
      )}
      {
        !bootstrapItems && <div className="skeleton h-32 w-32"></div>
      }
    </>
  );
}

