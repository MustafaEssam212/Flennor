import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import PhoneImg from '../public/phone.png';
import LocationImg from '../public/location.png';
import EmailImg from '../public/email.png';
import YellowShape from '@/components/YellowShape';
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";  

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const ContactUs = () => {
    const { t } = useTranslation('common');

    // Refs for useInView
    const headerRef = useRef(null);
    const contentHeaderRef = useRef(null);
    const phoneCardRef = useRef(null);
    const locationCardRef = useRef(null);
    const emailCardRef = useRef(null);

    // useInView hooks
    const isHeaderInView = useInView(headerRef, { once: true });
    const isContentHeaderInView = useInView(contentHeaderRef, { once: true });
    const isPhoneCardInView = useInView(phoneCardRef, { once: true });
    const isLocationCardInView = useInView(locationCardRef, { once: true });
    const isEmailCardInView = useInView(emailCardRef, { once: true });

    return (
        <div className="contact-us-page-container">

            {/* Header Animation */}
            <motion.div
                className='contact-us-header'
                ref={headerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHeaderInView ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                <div className='background-container'>
                    <h1>{t('contact.header.backgroundWord')}</h1>
                </div>
                <div className='layer-on-header'>
                    <h2>{t('contact.header.firstHeadline')}</h2>
                    <h1>{t('contact.header.secondHeadline')}</h1>
                </div>
            </motion.div>

            <div className='contact-us-content'>

                {/* Content Header Animation */}
                <motion.div
                    className='contact-us-content-header'
                    ref={contentHeaderRef}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: isContentHeaderInView ? 0 : 50, opacity: isContentHeaderInView ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1><YellowShape classname={`svg-headline`} />{t('contact.body.header.headline')}<YellowShape classname={`svg-headline`} /></h1>
                    <h3>{t('contact.body.header.sub')}</h3>
                </motion.div>

                <div className='contact-cards'>
                    
                    {/* Phone Card Animation */}
                    <motion.div
                        className='contact-card'
                        ref={phoneCardRef}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: isPhoneCardInView ? 0 : 50, opacity: isPhoneCardInView ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className='top-contact-card'>
                            <Image src={PhoneImg} width={120} height={120} alt='Flennor Parts Address' title='Flennor Parts Address' />
                        </div>
                        <div className='body-contact-card'>
                            <h3><FiPhone className='icon' /> {t('contact.body.content.phoneCard.phoneOne')}</h3>
                        </div>
                    </motion.div>

                    {/* Location Card Animation */}
                    <motion.div
                        className='contact-card'
                        ref={locationCardRef}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: isLocationCardInView ? 0 : 50, opacity: isLocationCardInView ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className='top-contact-card'>
                            <Image src={LocationImg} width={120} height={120} alt='Flennor Parts Address' title='Flennor Parts Address' />
                        </div>
                        <div className='body-contact-card'>
                            <h3><IoLocationOutline className='icon' /> {t('contact.body.content.addressCard.addressOne')}</h3>
                            <h3><IoLocationOutline className='icon' /> {t('contact.body.content.addressCard.addressTwo')}</h3>
                            <h3><IoLocationOutline className='icon' /> {t('contact.body.content.addressCard.addressThree')}</h3>
                            <h3><IoLocationOutline className='icon' /> {t('contact.body.content.addressCard.addressFour')}</h3>
                        </div>
                    </motion.div>

                    {/* Email Card Animation */}
                    <motion.div
                        className='contact-card'
                        ref={emailCardRef}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: isEmailCardInView ? 0 : 50, opacity: isEmailCardInView ? 1 : 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <div className='top-contact-card'>
                            <Image src={EmailImg} width={120} height={120} alt='Flennor Parts Address' title='Flennor Parts Address' />
                        </div>
                        <div className='body-contact-card'>
                            <h3><MdOutlineMailOutline className='icon' /> {t('contact.body.content.emailCard.emailOne')}</h3>
                        </div>
                    </motion.div>

                </div>

            </div>
        </div>
    );
};

export default ContactUs;
