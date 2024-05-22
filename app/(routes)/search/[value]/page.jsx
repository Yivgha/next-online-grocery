'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import GlobalAPI from '@/app/_utils/GlobalAPI';
import ProductList from '@/app/_components/ProductList';

function SearchPage() {
  const pathName = usePathname();
  const getVal = pathName.slice(8);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearchByName = async () => {
    setLoading(true);
    await GlobalAPI.searchByProductName(getVal).then((res) => {
      console.log('search array', res);
      setProductList(res);
    });
    setLoading(false);
  };

  useEffect(() => {
    onSearchByName();
  }, [getVal]);

  return (
    <div className='w-full px-10 py-5 min-h-screen flex flex-col gap-3 md:gap-5'>
      <h2 className='font-bold text-3xl text-green-700'>
        Search by product name
      </h2>
      <ProductList
        productList={productList}
        title='Products by search'
        loading={loading}
      />
    </div>
  );
}

export default SearchPage;

