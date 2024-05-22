'use client';
import { cn } from '@/lib/utils';
import { Outfit } from 'next/font/google';
import ProductItem from './ProductItem';
import { LoaderIcon } from 'lucide-react';

const outfit = Outfit({ subsets: ['latin'], display: 'swap' });

function ProductList({ productList, title, loading }) {
  return (
    <section
      id='products'
      className={cn(
        outfit.className,
        'w-full h-[650px] overflow-y-scroll flex flex-col gap-2'
      )}
    >
      <h3 className='text-primary font-bold text-2xl'>{title}</h3>
      {loading === true && (
        <div className='self-center flex flex-row gap-2 items-center'>
          <LoaderIcon className='animate-spin  w-10 h-10' />
          <p className='text-xl'>Loading</p>
        </div>
      )}
      {!loading && (!productList || productList.length === 0) && (
        <p className='text-center'>Nothing found</p>
      )}

      <div className='grid grid-cols-1 md:grid-cols-3 ld:grid-cols-4 gap-1 md:gap-3'>
        {productList?.map((product, idx) => (
          <ProductItem key={idx} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;

