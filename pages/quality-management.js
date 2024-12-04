import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import IsoImg from '../public/iso.jpg';
import Image from 'next/image';
import { useEffect } from 'react';

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}





const QualityManagement = ()=> {
    

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
            
            <h1>DIN EN ISO 9001:2015</h1>
            <h2>Quality management is in lived all areas of our company. The processes and products should not only meet the demands of the market – it is our goal to know the needs of our customers exactly and fulfil these in their entirety.

            To guarantee this at all times, our company is subjected to permanent monitoring by IAF and is certified in accordance with ISO 9001:2015.

            Our constant drive for innovate products and the increased quality awareness of our customers demand for continuous improvement of the product quality and productivity.

            All employees of our company are committed to exercise the maximum possible diligence and permanent controls and checks at all levels in order to ensure the highest level of quality.</h2>

            <div className='img-container'>
                <Image src={IsoImg} alt="Flennor Parts ISO Image" title="Flennor Parts ISO Image" fill loading='lazy' />
            </div>

        </div>
    )
}


export default QualityManagement;