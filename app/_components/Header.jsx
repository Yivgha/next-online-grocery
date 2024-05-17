'use client';

import { useState, useEffect } from 'react';
import { Outfit } from 'next/font/google';
import Image from 'next/image';
import Logo from '@/public/logo.png';
import { cn } from '@/lib/utils';
import { LayoutGrid, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import GlobalAPI from '../_utils/GlobalAPI';

const outfit = Outfit({ subsets: ['latin'], display: 'swap' });
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function Header() {
  const [categoryList, setCategoryList] = useState([]);

  const getCategoriesList = () => {
    GlobalAPI.getCategories()
      .then((res) => setCategoryList(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <div className='min-h-5 w-full py-3 px-5 bg-primary shadow-md flex justify-between'>
      <div className='flex flex-row items-center gap-8'>
        <div className='flex flex-row gap-1 items-center'>
          <Image src={Logo} alt='Logo' className='md:w-10 md:h-10 w-5 h-5' />
          <div className='flex flex-col justify-center'>
            <p
              className={cn(
                outfit.className,
                'font-black uppercase text-secondary'
              )}
            >
              Grocery
            </p>
            <p
              className={cn(
                outfit.className,
                'font-black uppercase text-secondary'
              )}
            >
              Store
            </p>
          </div>
        </div>

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
              <DropdownMenuItem
                className='cursor-pointer gap-3 items-center'
                key={idx}
              >
                <Image
                  src={BASE_URL + el.attributes.icon.data.attributes.url}
                  alt={el.attributes.name}
                  width={25}
                  height={25}
                  loading='lazy'
                />
                <p className='text-lg'>{el.attributes.name}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className='gap-3 items-center border rounded-full py-2 px-5 hidden md:flex '>
          <Search className='w-5 h-5 text-secondary' />
          <input
            type='text'
            placeholder='Search'
            className='border-none outline-none bg-primary text-secondary'
          />
        </div>
      </div>
      <div className='flex gap-5 items-center'>
        <h2 className='flex gap-2 items-center text-lg text-secondary'>
          <ShoppingBag />0
        </h2>
        <Button className='bg-secondary text-primary'>Login</Button>
      </div>
    </div>
  );
}

export default Header;

