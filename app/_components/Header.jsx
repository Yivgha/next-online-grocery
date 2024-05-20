'use client';

import { useState, useEffect, useContext } from 'react';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { CircleUserIcon, LayoutGrid, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import GlobalAPI from '../_utils/GlobalAPI';
import LogoImg from './LogoImg';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { UpdateCartContext } from '../_context/UpdateCartContext';
import CartItemsList from './CartItemsList';
import { toast } from 'sonner';

const outfit = Outfit({ subsets: ['latin'], display: 'swap' });
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const storageUser = JSON.parse(localStorage.getItem('user'));
  const jwt = localStorage.getItem('jwt');

  const { updateCart } = useContext(UpdateCartContext);

  const router = useRouter();
  const pathname = usePathname();
  const isSignIn = pathname === '/sign-in' || pathname === '/create-account';

  // GET ALL CATEGORIES
  const getCategoriesList = () => {
    GlobalAPI.getCategories()
      .then((res) => setCategoryList(res.data.data))
      .catch((err) => console.log(err));
  };

  // GET ITEMS FROM USER CART
  const getCartItems = async () => {
    if (storageUser)
      await GlobalAPI.getCartItems(storageUser.id, jwt).then((res) =>
        setTotalCartItems(res.length)
      );
  };

  const getCartItemList = async () => {
    if (storageUser)
      await GlobalAPI.getCartItemsAndImages(storageUser.id, jwt).then((res) =>
        setCartItemList(res)
      );
  };

  const onDeleteItem = (id) => {
    if (jwt) {
      GlobalAPI.deleteCartItem(id, jwt)
        .then((res) => {
          toast('Item deleted');
          getCartItems();
          getCartItemList();
        })
        .catch((err) => toast('Error while deleting item from cart'));
    }
  };

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((el) => (total = total + el.amount));
    setSubtotal(total.toFixed(2));
  }, [cartItemList]);

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    getCartItems();
    getCartItemList();
  }, [updateCart]);

  return (
    <header
      className='min-h-5 w-full py-3 px-5 bg-primary shadow-md flex flex-col md:flex-row  items-center justify-center md:justify-between gap-3 md:gap-0'
      id='header'
    >
      <div className='flex flex-row items-center gap-8'>
        <LogoImg />

        {!isSignIn && (
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(outfit.className, 'font-normal cursor-pointer')}
              asChild
            >
              <h2 className='hidden md:flex gap-2 items-center border rounded-full p-2 px-5 bg-slate-200'>
                <LayoutGrid className='w-5 h-5' />
                Category
              </h2>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={cn(outfit.className, 'font-normal outline-none')}
            >
              {categoryList.map((el, idx) => (
                <Link
                  href={'/products-category/' + el.attributes.name}
                  key={idx}
                >
                  <DropdownMenuItem className='gap-3 items-center cursor-pointer'>
                    <Image
                      src={BASE_URL + el.attributes.icon.data.attributes.url}
                      alt={el.attributes.name}
                      width={25}
                      height={25}
                      loading='lazy'
                    />
                    <p className='text-lg'>{el.attributes.name}</p>
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {!isSignIn && (
          <div className='gap-3 items-center border rounded-full py-2 px-5 hidden md:flex'>
            <Search className='w-5 h-5 text-secondary' />
            <input
              type='text'
              placeholder='Search'
              className='border-none outline-none bg-primary text-secondary'
            />
          </div>
        )}
      </div>
      <div className='flex gap-5 items-center'>
        {/* CART ITEMS RIGHT MENU */}
        {storageUser && (
          <Sheet asChild>
            <SheetTrigger>
              <h2 className='flex gap-2 items-center text-lg'>
                <ShoppingBag className='text-secondary' />
                <span className='bg-green-100 rounded-full px-2 text-primary font-bold'>
                  {totalCartItems}
                </span>
              </h2>
            </SheetTrigger>
            <SheetContent className='flex flex-col gap-3'>
              <SheetHeader>
                <SheetTitle className='font-bold text-primary text-3xl mb-3'>
                  My Cart
                </SheetTitle>
                <SheetDescription className='w-full'>
                  <CartItemsList
                    cartItemList={cartItemList}
                    onDeleteItem={onDeleteItem}
                  />
                </SheetDescription>
              </SheetHeader>
              <SheetClose asChild>
                <div className='w-[90%] p-2 flex flex-col gap-2 absolute bottom-2'>
                  <p className='font-bold text-green-700 text-lg md:text-2xl'>
                    Subtotal: <span>{subtotal} UAH</span>
                  </p>
                  <Button
                    onClick={() => router.push(jwt ? '/checkout' : '/sign-in')}
                  >
                    Checkout
                  </Button>
                </div>
              </SheetClose>
            </SheetContent>
          </Sheet>
        )}

        {storageUser ? (
          <div className='flex flex-row gap-2 items-center'>
            <h4 className='text-secondary'>{storageUser?.username}</h4>
            <DropdownMenu>
              <DropdownMenuTrigger asChild className='cursor-pointer'>
                <CircleUserIcon className='w-7 h-7 text-secondary' />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className='cursor-pointer'>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className='cursor-pointer'>
                  My orders
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='cursor-pointer'
                  onClick={() => {
                    localStorage.clear();
                    router.push('/sign-in');
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button
            className='bg-secondary text-primary hover:bg-green-100'
            onClick={() => router.push('/sign-in')}
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
}

export default Header;

