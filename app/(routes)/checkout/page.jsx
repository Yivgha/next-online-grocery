'use client';

import { useState, useEffect, useContext } from 'react';
import { Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import GlobalAPI from '@/app/_utils/GlobalAPI';
import { UpdateCartContext } from '@/app/_context/UpdateCartContext';
import { useRouter } from 'next/navigation';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const outfit = Outfit({ subsets: ['latin'], weight: '400', display: 'swap' });

function Checkout() {
  const jwt = localStorage.getItem('jwt');
  const user = JSON.parse(localStorage.getItem('user'));

  const router = useRouter();

  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const [cartItemList, setCartItemList] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [convertedInUSD, setConvertedInUSD] = useState(0);
  const [isCalculating, setIsCalculating] = useState(true);

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
      router.replace('/sign-in');
    }
    getCartItemList();
  }, [updateCart]);

  useEffect(() => {
    if (cartItemList.length > 0) {
      setIsCalculating(true);
      let total = 0;
      cartItemList.forEach((el) => (total += el.amount));
      const calculatedSubtotal = Number(total.toFixed(2));
      setSubtotal(calculatedSubtotal);

      const calcTax = Number((calculatedSubtotal * 0.15).toFixed(2));
      setTax(calcTax);

      const calcTotalAmount = calculatedSubtotal * 1.15 + 30;
      const totalAmountInUAH = Number(calcTotalAmount.toFixed(2));
      setTotalAmount(totalAmountInUAH);

      const exchangeRate = 0.036;
      const calcInUSD = totalAmountInUAH * exchangeRate;
      const totalAmountInUSD = Number(calcInUSD.toFixed(2));
      setConvertedInUSD(totalAmountInUSD);

      setIsCalculating(false);
    }
  }, [cartItemList]);

  const onApprove = async (data) => {
    console.log(data);

    const stringPaymentId = data?.paymentId.toString();
    const payload = {
      data: {
        paymentId: stringPaymentId,
        total_order_amount: totalAmount,
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        userId: user.id,
        orderItemList: cartItemList,
      },
    };

    try {
      const res = await GlobalAPI.createOrder(payload, jwt);
      console.log('res', res);
      toast('Created an order');

      await Promise.all(
        cartItemList.map((el) => {
          GlobalAPI.deleteCartItem(el.id, jwt);
          console.log('delete item', el.id);
        })
      );

      setUpdateCart((prev) => !prev);

      router.replace('/order-confirmation');
    } catch (err) {
      toast('Error while creating order.', err.message);
    }
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
              Tax (15%): <span>{tax} UAH</span>
            </p>
            <hr />
            <h4 className='text-green-700 font-bold text-lg flex justify-between'>
              Total: <span>{totalAmount} UAH</span>
            </h4>

            {!isCalculating && (
              <PayPalScriptProvider
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
                  currency: 'USD',
                }}
              >
                {/* For testing order data */}
                <Button onClick={() => onApprove({ paymentId: 133 })}>
                  Payment
                </Button>
                <PayPalButtons
                  style={{ layout: 'horizontal', tagline: false }}
                  className='paypalbtn'
                  disabled={!username || !email || !phone || !zip || !address}
                  onApprove={onApprove}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: convertedInUSD,
                            currency_code: 'USD',
                          },
                        },
                      ],
                    });
                  }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

