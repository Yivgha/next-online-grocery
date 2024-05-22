'use client';

import { useEffect, useState } from 'react';
import GlobalAPI from '@/app/_utils/GlobalAPI';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function MyOrder() {
  const jwt = localStorage.getItem('jwt');
  const user = JSON.parse(localStorage.getItem('user'));

  const router = useRouter();

  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    if (!jwt) {
      router.replace('/');
    }
    getOrders();
  }, []);

  const getOrders = async () => {
    await GlobalAPI.getUserOrders(user.id, jwt).then((res) =>
      setOrdersList(res)
    );
  };

  const convertDate = (utcTimeStr) => {
    const utcDate = new Date(utcTimeStr);
    const dayMonth = utcDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    const time = utcDate.toLocaleTimeString('ua-UK', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const formattedDate = `${time} ${dayMonth}`;
    return formattedDate;
  };

  return (
    <div className='w-full px-10 py-5 min-h-screen flex flex-col gap-3 md:gap-5'>
      <h2 className='font-bold text-3xl text-green-700'>My orders</h2>
      <p className='text-xl text-green-700 text-center'>History of orders</p>
      {!ordersList ||
        (ordersList.length === 0 && (
          <p className='text-center'>You don't have any orders yet</p>
        ))}
      <div className='grid grid-cols-1 gap-1 md:gap-3 w-full'>
        {ordersList.map((el, idx) => (
          <Collapsible
            key={idx}
            className='border border-primary bg-slate-200 rounded w-full  p-2'
          >
            <CollapsibleTrigger className='flex flex-row justify-between w-full'>
              <div className='flex flex-col gap-1 items-start p-3'>
                <p>
                  <span className='font-bold'>Order </span>#{el.order_id}
                </p>
                <p>
                  <span className='font-bold'> Date: </span>
                  {convertDate(el.created_at)}
                </p>
                <p>
                  <span className='font-bold'>Total price: </span>
                  {el.total_order_amount}
                </p>

                <p>
                  <span className='font-bold'>Delivery address: </span>
                  {el.address.trim('').length === 0
                    ? 'Not provided'
                    : el.address}
                </p>
                <p>
                  <span className='font-bold'>Status: </span> {el.status}
                </p>
              </div>
              <p> (Click to open)</p>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                {el.orderItemList.map((item, idx) => (
                  <div
                    key={idx}
                    className='flex flex-row justify-between p-2 border border-primary rounded bg-slate-300'
                  >
                    <div className='flex flex-col gap-2 flex-1 w-full p-3'>
                      <p className='font-bold text-3xl'>
                        {item.product.data.attributes.name}
                      </p>
                      <p>
                        <span className='font-bold'> Quantity: </span>
                        {item.quantity}
                      </p>
                      <p>
                        <span className='font-bold'> Price: </span>
                        {item.amount}
                      </p>
                    </div>
                    <div className='flex flex-1 w-full h-auto rounded justify-end'>
                      <Image
                        src={
                          BASE_URL +
                          item.product.data.attributes.images.data[0].attributes
                            .url
                        }
                        alt='product image'
                        width={150}
                        height={100}
                        priority={true}
                        className='object-cover h-full w-[300px] rounded'
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}

export default MyOrder;

