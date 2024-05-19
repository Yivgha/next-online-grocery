import { Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';
import GlobalAPI from '@/app/_utils/GlobalAPI';
import TopCategoryList from '../_components/TopCategoryList';
import ProductList from '@/app/_components/ProductList';

const outfit = Outfit({ subsets: ['latin'], weight: '400', display: 'swap' });

export default async function ProductCategory({ params }) {
  const productList = await GlobalAPI.getProductsByCategory(
    params.categoryName
  );
  const categoryList = await GlobalAPI.getCategoryList();

  return (
    <div
      className={cn(
        outfit.className,
        'w-full px-10 py-5 min-h-screen flex flex-col gap-3 md:gap-5'
      )}
    >
      <h2 className='font-bold text-3xl text-green-700'>
        {params.categoryName}
      </h2>
      <TopCategoryList
        categoryList={categoryList}
        selectedCategory={params.categoryName}
      />

      <ProductList productList={productList} title='Products by category' />
    </div>
  );
}

