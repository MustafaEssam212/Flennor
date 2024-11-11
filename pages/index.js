import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import IntroHomepage from '@/components/HomePage/Intro-Homepage';
import Categories from '@/components/HomePage/Categories';
import Brands from '@/components/HomePage/Brands';
import AboutFlennor from '@/components/HomePage/About-Flennor';
import Counter from '@/components/HomePage/Counter';
import CarImages from '@/components/HomePage/Cars-Images';
import Map from '@/components/HomePage/Map';

export async function getStaticProps({ locale }) {  
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}

export default function Home() {


  return (
    <div className='homepage-container'>
      <IntroHomepage />
      <Categories />
      <Brands />
      <CarImages />
      <AboutFlennor />
      <Counter />
      <Map />
    </div>
  );
}
