
import Image from "next/image";
import FlennorPartsBG from '../../public/flennor-parts-intro-bg.jpg';
import { IoSearchOutline } from "react-icons/io5";
import { useState } from 'react';
import { useTranslation } from 'next-i18next';
import SpareIcon from '../../public/icons/spare-icon.png';
import SpareIconTwo from '../../public/icons/spare-icon-two.png';
import SpareIconThree from '../../public/icons/spare-icon-three.png';
import SpareIconFour from '../../public/icons/spare-icon-four.png';
import SpareIconFive from '../../public/icons/spare-icon-five.png'
import SpareIconSix from '../../public/icons/spare-icon-six.png'
import SpareIconSeven from '../../public/icons/spare-icon-seven.png'
import SpareIconEight from '../../public/icons/spare-icon-eight.png'
import { useRouter } from "next/router";

const IntroHomepage = () => {
    const { t } = useTranslation('common');
    const [search, setSearch] = useState('');
    const router = useRouter();
    const { i18n } = useTranslation();

    const handleKeyDown = (event) => {
        if(event.keyCode === 13){
            if(!search){
                return
            }

            router.push(`/products?text=${search}`);
        }
    }


    return(
        <div className="intro-homepage-container">
            
            <div className="img-container-intro"><Image src={FlennorPartsBG} fill style={{objectFit: 'cover'}} alt="Flennor Parts" title="Flennor Parts" /></div>

            <div className="layer-on-intro">

                <div className="inner-layer-on-intro">
                    <h1 className="great-headline">{t('homepage.intro.firstTitle')}</h1>
                    <h1 className="more-great-headline">{t('homepage.intro.mainTitle')}</h1>
                    <h1 className="greater-headline">{t('homepage.intro.middleTitle')}</h1>
                    <h1 className="greater-headline last-headline">{t('homepage.intro.secondTitle')}</h1>

                    <div className='input-container'>
                        <IoSearchOutline className='icon' />
                        <input onKeyDown={handleKeyDown} placeholder={t('homepage.intro.inputPlaceholder')} value={search} onChange={(s)=> setSearch(s.target.value)} />
                        <button onClick={()=> {
                            router.push(`/products?text=${search}`)
                        }} aria-label="Flennor Parts Product Search Input">{t('homepage.intro.btn')}</button>
                    </div>

                    <div className="icons-intro-container">
                        <div className="icon-bg"><Image src={SpareIcon} width={60} height={60} alt="Flennor Parts Icon" title="Flennor Parts Icon" /></div>
                        <div className="icon-bg"><Image src={SpareIconTwo} width={60} height={60} alt="Flennor Parts Icon" title="Flennor Parts Icon" /></div>
                        <div className="icon-bg"><Image src={SpareIconThree} width={60} height={60} alt="Flennor Parts Icon" title="Flennor Parts Icon" /></div>
                        <div className="icon-bg"><Image src={SpareIconFour} width={60} height={60} alt="Flennor Parts Icon" title="Flennor Parts Icon" /></div>
                        <div className="icon-bg"><Image src={SpareIconFive} width={60} height={60} alt="Flennor Parts Icon" title="Flennor Parts Icon" /></div>
                        <div className="icon-bg"><Image src={SpareIconSix} width={60} height={60} alt="Flennor Parts Icon" title="Flennor Parts Icon" /></div>
                        <div className="icon-bg"><Image src={SpareIconSeven} width={60} height={60} alt="Flennor Parts Icon" title="Flennor Parts Icon" /></div>
                        <div className="icon-bg"><Image src={SpareIconEight} width={60} height={60} alt="Flennor Parts Icon" title="Flennor Parts Icon" /></div>
                    </div>

                </div>

            </div>

        </div>
    )
}


export default IntroHomepage;