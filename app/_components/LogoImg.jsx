import { Outfit } from 'next/font/google';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { cn } from '@/lib/utils';

const outfit = Outfit({ subsets: ['latin'], display: 'swap' });

function LogoImg() {
  return (
    <div>
      <a href='/'>
        <div className='flex flex-row gap-1 items-center cursor-pointer'>
          <Image src={Logo} alt='Logo' className='md:w-10 md:h-10 w-5 h-5' />
          <div className='flex flex-col justify-center'>
            <p
              className={cn(
                outfit.className,
                'font-black uppercase text-secondary'
              )}
            >
              Grocery
            </p>
            <p
              className={cn(
                outfit.className,
                'font-black uppercase text-secondary'
              )}
            >
              Store
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default LogoImg;

