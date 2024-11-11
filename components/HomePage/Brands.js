import Image from "next/image";
import FlennorPartsBGBrands from '../../public/brands-bg.jpg';
import BMWLogo from '../../public/brands/bmw.png';
import FordLogo from '../../public/brands/ford.png';
import MBLogo from '../../public/brands/mb.png';
import OpelLogo from '../../public/brands/opel.png';
import RenaultLogo from '../../public/brands/renault.png';
import VolvoLogo from '../../public/brands/volvo.png';
import VolkswagenLogo from '../../public/brands/vw.png';
import { IoArrowForward, IoArrowBackSharp } from "react-icons/io5";
import { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';


const Brands = () => {

  const { t } = useTranslation('common');
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const brands = [
    { name: t('homepage.brands.BMW'), logo: BMWLogo },
    { name: t('homepage.brands.MB'), logo: MBLogo },
    { name: t('homepage.brands.Opel'), logo: OpelLogo },
    { name: t('homepage.brands.Renault'), logo: RenaultLogo },
    { name: t('homepage.brands.Volvo'), logo: VolvoLogo },
    { name: t('homepage.brands.Ford'), logo: FordLogo },
    { name: t('homepage.brands.Volkswagen'), logo: VolkswagenLogo },
    { name: t('homepage.brands.BMW'), logo: BMWLogo },
    { name: t('homepage.brands.MB'), logo: MBLogo },
    { name: t('homepage.brands.Opel'), logo: OpelLogo },
    { name: t('homepage.brands.Renault'), logo: RenaultLogo },
    { name: t('homepage.brands.Volvo'), logo: VolvoLogo },
    { name: t('homepage.brands.Ford'), logo: FordLogo },
    { name: t('homepage.brands.Volkswagen'), logo: VolkswagenLogo },
    { name: t('homepage.brands.BMW'), logo: BMWLogo },
    { name: t('homepage.brands.MB'), logo: MBLogo },
    { name: t('homepage.brands.Opel'), logo: OpelLogo },
    { name: t('homepage.brands.Renault'), logo: RenaultLogo },
    { name: t('homepage.brands.Volvo'), logo: VolvoLogo },
    { name: t('homepage.brands.Ford'), logo: FordLogo },
    { name: t('homepage.brands.Volkswagen'), logo: VolkswagenLogo },
  ];

  // Duplicate the brands array for infinite effect
  const allBrands = [...brands, ...brands];

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const scrollLeftFn = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 10; // Adjust scroll speed here
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Infinite scroll effect
  useEffect(() => {
    const carousel = carouselRef.current;
    const maxScrollLeft = carousel.scrollWidth / 2;

    const handleScroll = () => {
      if (carousel.scrollLeft >= maxScrollLeft) {
        carousel.scrollLeft = 0;
      }
    };

    carousel.addEventListener('scroll', handleScroll);
    return () => carousel.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="brands-homepage-container">
      <div className="barnds-img-container">
        <Image
          src={FlennorPartsBGBrands}  
          style={{ objectFit: 'cover' }}
          fill
          alt="Cars Brands in Flennor Parts"
          title="Cars Brands in Flennor Parts"
        />
      </div>

      <div className="layer-on-brands">
        <div className="arrow-back" onClick={scrollLeftFn}>
          <IoArrowBackSharp className="arrow-icon" />
        </div>
        <div
          className="inner-layer-on-brands"
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{ userSelect: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {allBrands.map((brand, index) => (
            <div className="car-brand" key={index}>
              <div className="layer-on-car-brand"></div>
              <div className="car-brand-img">
                <Image
                  src={brand.logo}
                  fill
                  title={`${brand.name} Brand in Flennor Parts`}
                  alt={`${brand.name} Brand in Flennor Parts`}
                  draggable={false}
                />
              </div>
              <h1>{brand.name}</h1>
            </div>
          ))}
        </div>
        <div className="arrow-forward" onClick={scrollRight}>
          <IoArrowForward className="arrow-icon" />
        </div>
      </div>
    </div>
  );
};

export default Brands;
