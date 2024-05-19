import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function TopCategoryList({ categoryList, selectedCategory }) {
  const decodedSelectedCategory = decodeURIComponent(selectedCategory);

  if (categoryList.length === 0 || !categoryList) {
    return <p>Nothing found</p>;
  }

  return (
    <div className='flex flex-row gap-1 md:gap-3 overflow-auto justify-center'>
      {categoryList?.map((cat, idx) => (
        <Link
          key={idx}
          href={'/products-category/' + cat.attributes.name}
          className={cn(
            'flex flex-col min-h-full bg-green-100 rounded-2xl cursor-pointer border border-primary w-[150px] min-w-[100px] md:min-w-[150px]',
            decodedSelectedCategory === cat.attributes.name && 'bg-green-300'
          )}
        >
          <div className='py-3 md:p-6 flex flex-col items-center gap-1 md:gap-3 flex-grow group hover:bg-green-300 rounded-2xl'>
            <Image
              src={BASE_URL + cat.attributes.icon.data.attributes.url}
              alt={cat.attributes.name}
              width={70}
              height={70}
              loading='lazy'
              className='w-[70px] h-[70px] object-cover group-hover:scale-125 transition-all ease-in-out'
            />
            <p className='text-xs md:text-base text-center whitespace-normal font-bold text-green-900'>
              {cat.attributes.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TopCategoryList;

