'use client';

import { useState, useEffect, useContext } from 'react';
import { Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowBigRight } from 'lucide-react';
import GlobalAPI from '@/app/_utils/GlobalAPI';
import { UpdateCartContext } from '@/app/_context/UpdateCartContext';
import { useRouter } from 'next/navigation';

const outfit = Outfit({ subsets: ['latin'], weight: '400', display: 'swap' });

function Checkout() {
  const jwt = localStorage.getItem('jwt');
  const user = JSON.parse(localStorage.getItem('user'));

  const router = useRouter();

  const { updateCart } = useContext(UpdateCartContext);

  const [cartItemList, setCartItemList] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  let totalAmount = 0;
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');

  const getCartItemList = async () => {
    if (user)
      await GlobalAPI.getCartItemsAndImages(user.id, jwt).then((res) => {
        setCartItemList(res);
        setTotalCartItems(res.length);
      });
  };

  useEffect(() => {
    if (!jwt) {
      router.push('/sign-in');
    }
    getCartItemList();
  }, [updateCart]);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((el) => (total = total + el.amount));
    setSubtotal(total.toFixed(2));
  }, [cartItemList]);

  const calculateTotalPrice = () => {
    totalAmount = subtotal * 1.15 + 30;
    return totalAmount.toFixed(2);
  };

  const onSubmit = () => {
    const totalPriceFixed = totalAmount.toFixed(2);
    const data = {
      username,
      email,
      phone,
      zip,
      address,
      totalPriceFixed,
    };
    console.log(data);
  };

  return (
    <div
      className={cn(
        outfit.className,
        'w-full px-10 py-5 min-h-screen flex flex-col gap-3 md:gap-5'
      )}
    >
      <h2 className='font-bold text-3xl text-green-700'> Checkout</h2>
      <div className='grid grid-cols-1 justify-center md:grid-cols-3 px-5 py-3 md:py-8 gap-3 md:gap-5'>
        <div className='flex flex-col col-span-2 gap-2 flex-1'>
          <h3 className='font-bold text-lg text-green-700'>Billing details</h3>
          <div className='grid md:grid-cols-2 gap-2'>
            <Input
              placeholder='Name'
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Input
              placeholder='Phone'
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input placeholder='Zip' onChange={(e) => setZip(e.target.value)} />
          </div>
          <div>
            <Input
              placeholder='Address'
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className='border py-2 flex flex-col flex-1'>
          <h3 className='font-bold text-lg text-green-700 text-center'>
            Total Cart ({totalCartItems})
          </h3>
          <div className='p-4 flex flex-col gap-4'>
            <h4 className='font-bold text-green-700 flex justify-between'>
              Subtotal: <span>{subtotal} UAH</span>
            </h4>
            <hr />
            <p className='flex justify-between'>
              Delivery: <span>30 UAH</span>
            </p>
            <p className='flex justify-between'>
              Tax (15%): <span>{(subtotal * 0.15).toFixed(2)} UAH</span>
            </p>
            <hr />
            <h4 className='text-green-700 font-bold text-lg flex justify-between'>
              Total: <span>{calculateTotalPrice()} UAH</span>
            </h4>
            <Button
              type='submit'
              className='flex flex-row gap-2 items-center'
              onClick={onSubmit}
            >
              Payment <ArrowBigRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

