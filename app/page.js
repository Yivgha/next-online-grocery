import CategoryList from './_components/CategoryList';
import Slider from './_components/Slider';
import ProductList from './_components/ProductList';
import GlobalAPI from './_utils/GlobalAPI';
import Banner from './_components/Banner';

export default async function Home() {
  const sliderList = await GlobalAPI.getSliders();
  const categoryList = await GlobalAPI.getCategoryList();
  const productList = await GlobalAPI.getAllProducts();

  return (
    <main className='flex min-h-screen flex-col items-center px-6 md:py-10 py-4 gap-3 md:gap-8 transition-all scroll-smooth'>
      <Slider sliderList={sliderList} />
      <CategoryList categoryList={categoryList} />
      <ProductList productList={productList} title='Popular products' />
      <Banner />
    </main>
  );
}
