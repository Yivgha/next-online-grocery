'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import ProductItemDetail from './ProductItemDetail';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function ProductItem({ product }) {
  return (
    <div className='flex flex-col h-full bg-green-100 rounded-2xl border border-primary hover:scale-95 hover:shadow-md transition-all ease-in-out'>
      <div className='p-3 md:p-6 flex flex-col items-center gap-1 md:gap-3 flex-grow group hover:bg-green-300 rounded-t-2xl'>
        <Image
          src={BASE_URL + product.attributes.images.data[0].attributes?.url}
          alt={product.attributes.name}
          width={300}
          height={150}
          className='object-cover w-[350px] h-[200px] rounded-xl'
          loading='lazy'
        />

        <p className='text-base text-green-700 font-semibold'>
          {product.attributes.name}
        </p>
        <div className='flex flex-col'>
          {product.attributes.selling_price && (
            <p className='text-base text-green-700'>
              UAH {product.attributes.selling_price} /{' '}
              {product.attributes.item_quantity_type}
            </p>
          )}
          <p
            className={cn(
              'text-base text-green-700',
              product.attributes.selling_price && 'line-through text-red-500'
            )}
          >
            UAH {product.attributes.actual_price} /{' '}
            {product.attributes.item_quantity_type}
          </p>
        </div>
      </div>

      {/* DIALOG */}

      <Dialog>
        <DialogTrigger asChild>
          <Button className='rounded-b-2xl'>Add to cart</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductItemDetail product={product} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductItem;

