'use client';

import BannerIMG from '@/public/delivery.jpg';
import Image from 'next/image';
import { Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';
import Testimonials from './Testimonials';
import Link from 'next/link';

const outfit = Outfit({ subsets: ['latin'], display: 'swap' });

function Banner() {
  return (
    <section className='w-full flex flex-col gap-1 md:gap-3'>
      <h3 className={cn(outfit.className, 'text-primary font-bold text-2xl')}>
        Delivery service
      </h3>
      <Image
        src={BannerIMG}
        alt='banner'
        height={500}
        width={1400}
        loading='lazy'
        className='w-full h-[250px] md:h-[750px] object-cover rounded-xl'
      />
      <Testimonials />
      <div className='flex flex-row gap-1 justify-center w-full'>
        <p>Want to get a daily/weekly/monthly grocery delivery?</p>
        <Link href='/delivery' className='italic text-primary'>
          Contact us!
        </Link>
      </div>
    </section>
  );
}

export default Banner;

