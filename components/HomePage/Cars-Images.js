
import Image from "next/image";
import BackgroundOne from '../../public/bg1.jpg';
import BackgroundTwo from '../../public/bg2.jpg';
import BackgroundThree from '../../public/bg3.jpg';
import BackgroundFour from '../../public/bg4.jpg';
import Link from "next/link";
import { FaCircleArrowRight } from "react-icons/fa6";   
import { useTranslation } from 'next-i18next';  


const CarImages = () => {

    const { t } = useTranslation('common');

    return(
        <div className="cars-images-homepage-container">
            

            <div className="inner-cars-container">
                <div className="car-container">
                    <div className="car-img-container"><Image sizes="(min-width: 2060px) 850px, (min-width: 1940px) 750px, (min-width: 1720px) 700px, (min-width: 1540px) 620px, (min-width: 1280px) 560px, (min-width: 920px) 500px, 95vw" loading="lazy" src={BackgroundOne} fill alt="Flennor Parts Cars" title="Flennor Parts Cars" /></div>
                    <div className="layer-on-car">
                        <h3>{t('homepage.carImages.imgOne.firstHeadline')}</h3>
                        <h1>{t('homepage.carImages.imgOne.secondHeadline')}</h1>
                        <Link href={`/products`}>{t('homepage.carImages.link')} <FaCircleArrowRight className="icon" /></Link>
                    </div>
                </div>

                <div className="car-container">
                    <div className="car-img-container"><Image sizes="(min-width: 2060px) 850px, (min-width: 1940px) 750px, (min-width: 1720px) 700px, (min-width: 1540px) 620px, (min-width: 1280px) 560px, (min-width: 920px) 500px, 95vw" loading="lazy" src={BackgroundTwo} fill alt="Flennor Parts Cars" title="Flennor Parts Cars" /></div>
                    <div className="layer-on-car">
                        <h3>{t('homepage.carImages.imgTwo.firstHeadline')}</h3>
                        <h1>{t('homepage.carImages.imgTwo.secondHeadline')}</h1>
                        <Link href={`/products`}>{t('homepage.carImages.link')} <FaCircleArrowRight className="icon" /></Link>
                    </div>
                </div>

                <div className="car-container">
                    <div className="car-img-container"><Image sizes="(min-width: 2060px) 850px, (min-width: 1940px) 750px, (min-width: 1720px) 700px, (min-width: 1540px) 620px, (min-width: 1280px) 560px, (min-width: 920px) 500px, 95vw" loading="lazy" src={BackgroundThree} fill alt="Flennor Parts Cars" title="Flennor Parts Cars" /></div>
                    <div className="layer-on-car">
                        <h3>{t('homepage.carImages.imgThree.firstHeadline')}</h3>
                        <h1>{t('homepage.carImages.imgThree.secondHeadline')}</h1>
                        <Link href={`/products`}>{t('homepage.carImages.link')} <FaCircleArrowRight className="icon" /></Link>
                    </div>
                </div>

                <div className="car-container">
                    <div className="car-img-container"><Image sizes="(min-width: 2060px) 850px, (min-width: 1940px) 750px, (min-width: 1720px) 700px, (min-width: 1540px) 620px, (min-width: 1280px) 560px, (min-width: 920px) 500px, 95vw" loading="lazy" src={BackgroundFour} fill alt="Flennor Parts Cars" title="Flennor Parts Cars" /></div>
                    <div className="layer-on-car">
                        <h3>{t('homepage.carImages.imgFour.firstHeadline')}</h3>
                        <h1>{t('homepage.carImages.imgFour.secondHeadline')}</h1>
                        <Link href={`/products`}>{t('homepage.carImages.link')} <FaCircleArrowRight className="icon" /></Link>
                    </div>
                </div>


            </div>


        </div>
    )
}


export default CarImages;