import { cn } from '@/lib/utils';
import { Outfit } from 'next/font/google';
import Image from 'next/image';

const outfit = Outfit({ subsets: ['latin'], display: 'swap' });
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

function CategoryList({ categoryList }) {
  return (
    <section
      className={cn(
        outfit.className,
        'flex flex-col gap-3 w-full sm:h-300 sm:overflow-y-scroll no-scrollbar'
      )}
    >
      <h3 className='text-primary font-bold text-2xl'>Shop by Category</h3>
      <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1 md:gap-3'>
        {categoryList.map((cat, idx) => (
          <div
            key={idx}
            className='flex flex-col h-full bg-green-100 rounded-2xl cursor-pointer border border-primary '
          >
            <div className='p-1 md:p-6 flex flex-col items-center gap-1 md:gap-3 flex-grow group hover:bg-green-300 rounded-2xl'>
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
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryList;

