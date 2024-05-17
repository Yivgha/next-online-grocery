import Slider from './_components/Slider';
import GlobalAPI from './_utils/GlobalAPI';

export default async function Home() {
  const sliderList = await GlobalAPI.getSliders();

  return (
    <main className='flex min-h-screen flex-col items-center px-6 md:py-10 py-4 gap-2 md:gap-4'>
      <Slider sliderList={sliderList} />
    </main>
  );
}
