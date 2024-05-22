'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LoaderIcon, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlobalAPI from '../_utils/GlobalAPI';
import { toast } from 'sonner';
import { UpdateCartContext } from '../_context/UpdateCartContext';
import { useContext } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function ProductItemDetail({ product }) {
  const jwt = localStorage.getItem('jwt');
  const user = JSON.parse(localStorage.getItem('user'));

  const router = useRouter();

  const [productTotalPrice, setProductTotalPrice] = useState(
    product.attributes.selling_price ?? product.attributes.actual_price
  );

  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const addToCart = () => {
    setLoading(true);
    if (!jwt) {
      router.replace('/sign-in');
      setLoading(false);
      return;
    }

    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_users: user.id,
        userID: user.id,
      },
    };

    GlobalAPI.addToCart(data, jwt)
      .then((res) => {
        toast('Added to cart');
        setUpdateCart(!updateCart);
        setLoading(false);
      })
      .catch((err) => {
        toast('Error while adding to cart', err.message);
        setLoading(false);
      });
  };

  return (
    <div className='flex flex-col md:flex-row justify-center gap-5 w-full max-h-[90vh] p-5 overflow-y-scroll lg:overflow-y-auto lg:no-scrollbar'>
      <div className='flex-1 w-full h-auto rounded-xl items-center'>
        <Image
          src={BASE_URL + product.attributes.images.data[0].attributes.url}
          alt='product'
          width={500}
          height={300}
          loading='lazy'
          className='object-contain rounded-xl'
        />
      </div>
      <div className='flex flex-col flex-1 items-center gap-4 text-center '>
        <h3 className='text-xl font-bold text-green-700'>
          {product.attributes.name}
        </h3>
        <p className='text-sm text-green-600'>
          {product.attributes.description}
        </p>

        <div className='flex flex-col'>
          {product.attributes.selling_price && (
            <p className='text-xl text-green-700'>
              UAH {product.attributes.selling_price} /{' '}
              {product.attributes.item_quantity_type}
            </p>
          )}
          <p
            className={cn(
              'text-xl text-green-700',
              product.attributes.selling_price &&
                'line-through text-red-500 text-sm'
            )}
          >
            UAH {product.attributes.actual_price} /{' '}
            {product.attributes.item_quantity_type}
          </p>
        </div>
        <h3 className='text-lg text-green-700 font-bold'>
          Quantity ({product.attributes.item_quantity_type})
        </h3>
        <div className=' gap-3 flex flex-col'>
          <div className='flex py-3 px-5 border flex-row gap-8 justify-center items-center rounded'>
            <button
              disabled={quantity === 1}
              className='text-xl'
              onClick={() => {
                if (quantity > 1) return setQuantity(quantity - 1);
              }}
            >
              -
            </button>
            <h4 className='text-xl'>{quantity}</h4>
            <button
              className='text-xl'
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <p className='text-green-700 text-lg'>
            <span className='font-bold'>Total: </span>
            {(quantity * productTotalPrice).toFixed(2)} <span>UAH</span>
          </p>
          <Button
            className='flex flex-row gap-3 items-center'
            onClick={() => addToCart()}
          >
            <ShoppingBag />
            {loading ? <LoaderIcon className='animate-spin' /> : 'Add to Cart'}
          </Button>
        </div>
        <h4 className='text-primary'>
          <span className='font-bold'>Category: </span>
          {product.attributes.categories.data[0].attributes.name}
        </h4>
      </div>
    </div>
  );
}

export default ProductItemDetail;

