'use client';

import { Roboto } from 'next/font/google';
import './globals.css';
import Header from './_components/Header';
import Footer from './_components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { UpdateCartContext } from './_context/UpdateCartContext';
import { useState } from 'react';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

export default function RootLayout({ children }) {
  const [updateCart, setUpdateCart] = useState(false);
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
          <Header />
          {children}
          <Footer />
          <Toaster />
        </UpdateCartContext.Provider>
      </body>
    </html>
  );
}
