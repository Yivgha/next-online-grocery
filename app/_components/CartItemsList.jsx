import { TrashIcon } from 'lucide-react';
import Image from 'next/image';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function CartItemsList({ cartItemList, onDeleteItem }) {
  return (
    <div className='w-full relative overflow-y-auto  max-h-screen h-[90vh]'>
      <div className='flex flex-col gap-3 overflow-y-auto max-h-[70%] '>
        {cartItemList.map((el, idx) => (
          <div
            key={idx}
            className='bg-slate-100 border border-slate-500 rounded flex flex-col md:flex-row justify-between p-2 gap-3 relative'
          >
            <div className='flex-1 w-full'>
              <Image
                src={BASE_URL + el.image}
                alt={el.name}
                width={70}
                height={70}
                className='rounded w-full object-cover'
                loading='lazy'
              />
            </div>
            <div className='flex flex-1 flex-col gap-2 w-full'>
              <p className='text-green-700 font-bold'>{el.name}</p>
              <p className='text-green-500'>Quantity: {el.quantity}</p>
              <p className='text-green-500 text-lg font-bold'>
                Price: {el.amount} UAH
              </p>
            </div>
            <TrashIcon
              className='w-5 h-5 text-destructive cursor-pointer absolute bottom-3 right-3 md:top-1 md:right-1'
              onClick={() => {
                onDeleteItem(el.id);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItemsList;

