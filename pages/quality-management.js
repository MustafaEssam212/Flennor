import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import IsoImg from '../public/iso.jpg';
import Image from 'next/image';
import { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { NextSeo } from 'next-seo';
import seoConfig from '../next-seo.config';

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}





const QualityManagement = ()=> {
    
    const { t } = useTranslation('common');

    const disableRightClick = (e) => {
        e.preventDefault();
      };
    
      useEffect(() => {
        document.addEventListener('contextmenu', disableRightClick);
    
        return () => {
          document.removeEventListener('contextmenu', disableRightClick);
        };
      }, []);   

    return(
        <div className="quality-management-container">

            <NextSeo
                {...seoConfig}
                title="Quality Management - Flennor Automotive Parts"
            />
            
            <h1>DIN EN ISO 9001:2015</h1>
            <h2>{t('quality.parag')}</h2>

            <div className='img-container'>
                <Image sizes="(min-width: 2060px) 298px, (min-width: 1940px) 268px, (min-width: 1720px) 248px, (min-width: 1540px) 228px, (min-width: 1280px) 208px, (min-width: 920px) 168px, (min-width: 380px) 128px, 108px" src={IsoImg} alt="Flennor Parts ISO Image" title="Flennor Parts ISO Image" fill loading='lazy' />
            </div>

        </div>
    )
}


export default QualityManagement;