import { Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';

const outfit = Outfit({ subsets: ['latin'], weight: '400', display: 'swap' });

function Checkout() {
  return (
    <div
      className={cn(
        outfit.className,
        'w-full px-10 py-5 min-h-screen flex flex-col gap-3 md:gap-5'
      )}
    >
      Checkout
    </div>
  );
}

export default Checkout;

