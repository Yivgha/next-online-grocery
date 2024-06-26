'use client';

import { Button } from '@/components/ui/button';
import { CircleCheck } from 'lucide-react';
import Link from 'next/link';

function OrderConfirmation() {
  return (
    <div className='flex  my-20 justify-center'>
      <div className='flex flex-col justify-center shadow-md border p-20 ronded-md items-center gap-3 px-32'>
        <CircleCheck className='h-24 w-24 text-primary' />
        <h2 className='text-3xl text-primary font-medium'>
          Successfully created!
        </h2>
        <h2 className='text-primary text-base'>Thank you!</h2>
        <Link href={'/my-order'}>
          <Button>Track your order</Button>
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmation;

