'use client';
import { cn } from '@/lib/utils';
import { Outfit } from 'next/font/google';
import ProductItem from './ProductItem';

const outfit = Outfit({ subsets: ['latin'], display: 'swap' });

function ProductList({ productList }) {
  return (
    <section
      id='products'
      className={cn(
        outfit.className,
        'w-full h-[650px] overflow-y-scroll flex flex-col gap-2'
      )}
    >
      <h3 className='text-primary font-bold text-2xl'>Popular products</h3>
      <div className='grid grid-cols-2 md:grid-cols-3 ld:grid-cols-4 gap-1 md:gap-3'>
        {productList?.map((product, idx) => (
          <ProductItem key={idx} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;

