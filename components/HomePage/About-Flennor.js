
import { motion, useInView } from 'framer-motion';
import { useRef } from "react";
import { useTranslation } from 'next-i18next';
import FlennorMotive from '../../public/flennor-motive.png';
import Image from 'next/image';


const AboutFlennor = () => {
    const ref1 = useRef();
    const isInView = useInView(ref1, { once: true });
    const { t } = useTranslation('common');

    return (
        <div className="about-flennor-homepage-container">
            <div className="inner-about-flennor-homepage">

                <motion.div
                    ref={ref1}
                    initial={{ x: -50, opacity: 0 }}
                    animate={isInView ? { x: 0, opacity: 1 } : {}}
                    transition={{ duration: 1.2 }}
                    className="left-about-flennor"  
                >
                    <Image sizes="(min-width: 2060px) 35vw, (min-width: 1280px) calc(39.08vw - 103px), (min-width: 920px) 50vw, (min-width: 520px) 90vw, 100vw" loading='lazy' src={FlennorMotive} fill alt='Flennor Parts Motive' title='Flennor Parts Motive' />
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ duration: 1.2 }}
                    className="right-about-flennor"
                >
                    <h1>{t('homepage.aboutFlennor.title')}</h1>
                    <h2>{t('homepage.aboutFlennor.firstAbout')}</h2>
                    <h2>{t('homepage.aboutFlennor.secondTitle')}</h2>
                    <h2>{t('homepage.aboutFlennor.secondAbout')}</h2>
                    <ul>
                        <li><h2>{t('homepage.aboutFlennor.list.firstList')}</h2></li>
                        <li><h2>{t('homepage.aboutFlennor.list.secondList')}</h2></li>
                        <li><h2>{t('homepage.aboutFlennor.list.thirdList')}</h2></li>
                        <li><h2>{t('homepage.aboutFlennor.list.fourthList')}</h2></li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutFlennor;
