
import { motion, useInView } from 'framer-motion';
import { useRef } from "react";
import { useTranslation } from 'next-i18next';

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
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 342.11 286.12"
                        style={{ maxWidth: '100%', height: 'auto' }}
                        >
                        <defs>
                            <style>
                            {`.cls-1 {fill: #f99f1c;} .cls-2 {fill: #fcc637;}`}
                            </style>
                        </defs>
                        <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_1-2" data-name="Layer 1">
                            <path
                                className="cls-1"
                                d="M67.12,174.67C28.88,148.31,0,128.42,0,98.43c0-25,20-53.17,45.58-60.49,43.6-12.46,71.65,44.7,113.52,33.15C195.26,61.1,192,13.6,234.92,2.31c21.21-5.58,49.64-1.26,62.56,15.33,13.76,17.67-1.89,34.11,10.77,65.87,10.83,27.17,26.8,26.53,32.32,48.48,6.71,26.68-9.63,56.45-26.51,72.92-34,33.2-85.32,27.06-121,22.79C133.77,220.6,94.5,193.53,67.12,174.67Z"
                            />
                            <path
                                className="cls-2"
                                d="M217.1,248.83c-45.95,20.23-120.72,26.55-162.41-19.89-28.32-31.55-27.2-71.66-26.93-77.89,3.09-72,77.94-126.56,144.6-135.48,16.55-2.22,55.48-7.44,88.25,16.57C302.79,63,312.41,126,295,172.59,276.24,222.79,230.23,243.05,217.1,248.83Z"
                            />
                            <ellipse className="cls-2" cx="215.65" cy="274.72" rx="11.81" ry="11.39" />
                            <ellipse className="cls-2" cx="92.6" cy="20.95" rx="10.98" ry="9.94" />
                            <ellipse className="cls-2" cx="123.26" cy="9.97" rx="6.84" ry="6.01" />
                            <ellipse className="cls-2" cx="25.48" cy="216.1" rx="6.84" ry="7.46" />

                            
                            </g>
                        </g>
                        </svg>
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
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default AboutFlennor;
