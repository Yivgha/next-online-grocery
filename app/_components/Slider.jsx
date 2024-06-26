'use client';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function Slider({ sliderList }) {
  return (
    <section id='slider' className='w-full flex flex-col items-center'>
      <h1 className='hidden'>Grocery store</h1>
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
      >
        <CarouselContent>
          {sliderList.map((el, idx) => (
            <CarouselItem key={idx}>
              <Image
                src={BASE_URL + el.attributes.image.data.attributes.url}
                alt={el.attributes.name}
                height={500}
                width={1400}
                priority={true}
                className='w-full h-[250px] md:h-[550px] object-cover rounded-xl'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

export default Slider;

