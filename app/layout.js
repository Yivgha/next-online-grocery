'use client';

import { Roboto } from 'next/font/google';
import './globals.css';
import Header from './_components/Header';
import Footer from './_components/Footer';
import { Toaster } from '@/components/ui/sonner';
import { UpdateCartContext } from './_context/UpdateCartContext';
import { useState } from 'react';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

// const initialOptions = {
//   clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
//   currency: 'UAH',
// };

export default function RootLayout({ children }) {
  const [updateCart, setUpdateCart] = useState(false);
  return (
    <html lang='en'>
      <title>Online grocery store</title>
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
