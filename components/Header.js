
import Image from "next/image";
import FlennorPartsLogo from '../public/flennor-parts-logo.png';
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import SpareIcon from '../public/spare-icon.png';
import EnFlag from '../public/en-flag.png';
import DeFlag from '../public/de-flag.png';
import ArFlag from '../public/ar-flag.png';
import { FaBars } from "react-icons/fa6";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import FlennorPartsWhiteLogo from '../public/flennor-parts-white-logo.png'


const Header = () => {


    const [openLangMenu, setOpenLangMenu] = useState(false);
    const langMenuRef = useRef();
    const [isSticky, setIsSticky] = useState(false);
    const router = useRouter();
    const { i18n } = useTranslation();
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const mobileMenuRef = useRef();
    const { t } = useTranslation('common');

    useEffect(() => {
        // Handler to detect click outside of the language menu
        const handleClickOutside = (event) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
                setOpenLangMenu(false);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [langMenuRef]);


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 250) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        // Attach scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    useEffect(() => {
        if(openMobileMenu){
            setOpenMobileMenu(false);
        }
    }, [router.pathname, i18n.language])

    const getLang = {
        "en": <div className="parag-img-container">
                <p>{t('header.langs.en')}</p>
                <div className="flag-image-container"><Image sizes="(min-width: 2060px) 30px, (min-width: 1940px) 28px, (min-width: 1720px) 25px, (min-width: 1540px) 22px, 20px" src={EnFlag} fill alt="English Flag" /></div>
              </div>,
        "de": <div className="parag-img-container">
                <p>{t('header.langs.de')}</p>
                <div className="flag-image-container"><Image sizes="(min-width: 2060px) 30px, (min-width: 1940px) 28px, (min-width: 1720px) 25px, (min-width: 1540px) 22px, 20px" src={DeFlag} fill alt="Deutch Flag" /></div>
             </div>,
        "ar": <div className="parag-img-container">
                <p>{t('header.langs.ar')}</p>
                <div className="flag-image-container"><Image sizes="(min-width: 2060px) 30px, (min-width: 1940px) 28px, (min-width: 1720px) 25px, (min-width: 1540px) 22px, 20px" src={ArFlag} fill alt="Arabic Flag" /></div>
              </div>
    }

    const changeLanguage = (lang) => {
        localStorage.setItem('preferredLanguage', lang);
        router.push(router.pathname, router.asPath, { locale: lang });
      };


      useEffect(() => {
        setOpenLangMenu(false);
        if (i18n.language === 'ar') {
          document.body.setAttribute('dir', 'rtl');
        } else {
          document.body.setAttribute('dir', 'ltr');
        }
      }, [i18n.language]);


      useEffect(() => {
        // Handler to detect click outside of the language menu
        const handleClickOutside = (event) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setOpenMobileMenu(false);
            }
        };

        // Add event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuRef]);

    return(
        <header className={isSticky ? "sticky-header" : ""}>

                <div className="logo-container">
                    <Link href={`/`}><Image sizes="(min-width: 2060px) 250px, (min-width: 1940px) 230px, (min-width: 1720px) 210px, (min-width: 1540px) 185px, (min-width: 1100px) 165px, 140px" src={FlennorPartsLogo} fill title="Flennor Parts" alt="Flennor Parts"></Image></Link>
                </div>


                <div className="header-content">
                    <div className="navs-container">
                        <Link className={router.pathname === '/' ? "active-link" : ""} href={`/`} title={t('header.navs.home')} aria-label="Home">{t('header.navs.home')} </Link>
                        <Link className={router.pathname === '/about' ? "active-link" : ""} href={`/about`} title={`${t('header.navs.about')} Flennor Parts`} aria-label="About Flennor Parts">{t('header.navs.about')}</Link>
                        <Link className={router.pathname === '/contact' ? "active-link" : ""} href={`/contact`} title={`${t('header.navs.contact')} Flennor Parts`} aria-label="Contact Flennor Parts">{t('header.navs.contact')}</Link>
                        <Link className={router.pathname === '/quality-management' ? "active-link" : ""} href={`/quality-management`} title={`${t('header.navs.qualityManagment')} Flennor Parts`} aria-label="Quality Managment Flennor Parts">{t('header.navs.qualityManagment')}</Link>
                    </div>


                    <FaBars onClick={()=> setOpenMobileMenu(!openMobileMenu)} className="bars-icon" />

                    <Link href={`/products`} title={t('header.styled-link')} aria-label="Flennor Parts Products" className="styled-link"><span className="icon-container"><Image sizes="(min-width: 2060px) 40px, (min-width: 1940px) 35px, (min-width: 1720px) 33px, (min-width: 1540px) 30px, (min-width: 1100px) 28px, 23px" src={SpareIcon} fill alt="Spare Part Icon" /></span> <span className="title-link">{t('header.styled-link')}</span></Link>

                    <div className={openLangMenu ? "languages active-languages" : "languages"}>

                        <div onClick={()=> setOpenLangMenu(!openLangMenu)} className="main-languages-div" aria-label="Click To Change Flennor Parts Language" title="Click To Change Flennor Parts Language">

                            {getLang[i18n.language]}

                            <MdKeyboardArrowDown className="icon" />

                        </div>



                        {
                            openLangMenu && <div className="lang-menu" ref={langMenuRef}>

                                    <div onClick={() => changeLanguage('en')} aria-label="Change Language To English" title="Change Language To English" className="lang-choice"><p>{t('header.langs.en')}</p> <div className="img-container"><Image loading="lazy" src={EnFlag} fill alt="English Flag" /></div></div>
                                    
                                    <div onClick={() => changeLanguage('de')} aria-label="Change Language To Deutch" title="Change Language To Deutch" className="lang-choice"><p>{t('header.langs.de')}</p> <div className="img-container"><Image loading="lazy" src={DeFlag} fill alt="Deutch Flag" /></div></div>

                                    <div onClick={() => changeLanguage('ar')} aria-label="Change Language To ARABIC" title="Change Language To ARABIC" className="lang-choice"><p>{t('header.langs.ar')}</p> <div className="img-container"><Image loading="lazy" src={ArFlag} fill alt="Arabic flag" /></div></div>

                            </div>
                        }
                    </div>
                </div>


                <AnimatePresence>
                {openMobileMenu && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <motion.div
                            className="inner-mobile-menu"
                            ref={mobileMenuRef}
                            initial={{ x: i18n.language === 'ar' ? "100%" : "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: i18n.language === 'ar' ? "100%" : "-100%" }}
                            transition={{ type: "tween", duration: 0.5 }}
                        >
                            <div className="top-inner-mobile-menu">
                                <div className="logo-container">
                                    <Link href={`/`}><Image src={FlennorPartsWhiteLogo} fill title="Flennor Parts" alt="Flennor Parts"></Image></Link>
                                </div>
                                <div className="top-inner-mobile-menu-links">
                                    <Link className={router.pathname === '/' ? "active-link" : ""} href={`/`} title={t('header.navs.home')} aria-label="Home">{t('header.navs.home')} </Link>
                                    <Link className={router.pathname === '/about' ? "active-link" : ""} href={`/about`} title={`${t('header.navs.about')} Flennor Parts`} aria-label="About Flennor Parts">{t('header.navs.about')}</Link>
                                    <Link className={router.pathname === '/contact' ? "active-link" : ""} href={`/contact`} title={`${t('header.navs.contact')} Flennor Parts`} aria-label="Contact Flennor Parts">{t('header.navs.contact')}</Link>
                                    <Link className={router.pathname === '/quality-management' ? "active-link" : ""} href={`/quality-management`} title={`${t('header.navs.qualityManagment')} Flennor Parts`} aria-label="Quality Managment Flennor Parts">{t('header.navs.qualityManagment')}</Link>
                                </div>
                            </div>

                            <div className="bottom-inner-mobile-menu">
                                <button onClick={() => changeLanguage('en')} className={i18n.language === 'en' ? "active-lang" : ""}>EN</button>
                                <button onClick={() => changeLanguage('de')} className={i18n.language === 'de' ? "active-lang" : ""}>DE</button>
                                <button onClick={() => changeLanguage('ar')} className={i18n.language === 'ar' ? "active-lang" : ""}>AR</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </header>
    )
}


export default Header;