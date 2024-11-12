import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import FlennorAboutBg from '../public/flennor-about-bg.png';
import YellowShape from '@/components/YellowShape';
import ThunderPic from '../public/thunder.webp';
import MegaphonePic from '../public/megaphone.png';
import TaskPic from '../public/task.png';
import HonestyPic from '../public/honesty.png';
import Innovation from '../public/innovation.png';
import Excellence from '../public/excellence.png';
import Counter from '@/components/HomePage/Counter';
import Map from '../public/map2.png';
import { useTranslation } from 'next-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const useAnimateInView = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    return { ref, inView };
};

const About = () => {
    const { t } = useTranslation('common');

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const sectionsData = [
        { image: ThunderPic, title: 'sectionOne', subtitle: 'sectionOne' },
        { image: TaskPic, title: 'sectionTwo', subtitle: 'sectionTwo' },
        { image: MegaphonePic, title: 'sectionThree', subtitle: 'sectionThree' },
        { image: Excellence, title: 'sectionFour', subtitle: 'sectionFour' },
        { image: HonestyPic, title: 'sectionFive', subtitle: 'sectionFive' },
        { image: Innovation, title: 'sectionSix', subtitle: 'sectionSix' },
    ];

    const sectionRefs = sectionsData.map(() => useAnimateInView());

    return (
        <div className="about-page-container">
            {/* Header Section */}
            <motion.div
                className="about-page-header"
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
            >
                <div className="img-container">
                    <Image
                        src={FlennorAboutBg}
                        fill
                        style={{ objectFit: 'cover' }}
                        alt="Flennor Parts about page pic"
                        title="Flennor Parts about page pic"
                    />
                </div>
                <div className="layer-on-image">
                    <h1>{t('about.header.headline')}</h1>
                    <h2>{t('about.header.subHeadline')}</h2>
                </div>
            </motion.div>

            {/* Sections */}
            <div className="about-sections-container">
                <motion.h1
                    className="main-headline"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                >
                    <YellowShape classname="svg-headline" /> {t('about.sections.headlineOne')}
                </motion.h1>
                <motion.h1
                    className="main-headline"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                >
                    {t('about.sections.headlineTwo')}
                    <YellowShape classname="svg-headline" />
                </motion.h1>

                {/* Individual Sections with Animation */}
                <div className="sections-container">
                    {sectionsData.map(({ image, title, subtitle }, index) => {
                        const { ref, inView } = sectionRefs[index];
                        return (
                            <motion.div
                                className="section"
                                ref={ref}
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="top-section">
                                    <Image
                                        src={image}
                                        width={100}
                                        height={100}
                                        alt="Flennor Parts"
                                        title="Flennor Parts"
                                    />
                                    <h1>{t(`about.sections.sectionsContainer.${title}.title`)}</h1>
                                </div>
                                <div className="bottom-section">
                                    <h2>{t(`about.sections.sectionsContainer.${subtitle}.subTitle`)}</h2>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Numbers Section */}
            <motion.div
                className="about-numbers-container"
                initial="hidden"
                whileInView="visible"
                variants={fadeInUp}
            >
                <div className="about-numbers-header">
                    <h1>
                        <YellowShape classname="svg-headline" /> {t('about.numbers.headline')}
                        <YellowShape classname="svg-headline" />
                    </h1>
                    <h3>{t('about.numbers.sub')}</h3>
                </div>
                <div className="about-counter">
                    <Counter />
                </div>
            </motion.div>

            {/* Global Presence Section */}
            <div className="global-presence-container">
                <div className="global-presence-header">
                    <motion.h1
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                    >
                        <YellowShape classname="svg-headline" /> {t('about.global.headline')}
                        <YellowShape classname="svg-headline" />
                    </motion.h1>
                    <motion.h3
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                    >
                        {t('about.global.subHeadline')}
                    </motion.h3>
                </div>

                <div className="map-container">
                    <div className="img-container">
                        <Image src={Map} fill alt="Flennor Parts Map" title="Flennor Parts Map" />
                    </div>
                    <div className="layer-on-map">
                        <div className="inner-layer-on-map">
                            <div className="headline-on-map">
                                <span className="circle-span"></span>
                                <h1>{t('about.global.map.one.headline')}
                                    <span>{t('about.global.map.one.sub')}</span>
                                </h1>
                            </div>
                            <div className="headline-on-map">
                                <span className="circle-span"></span>
                                <h1>{t('about.global.map.two.headline')}
                                    <span>{t('about.global.map.two.sub')}</span>
                                </h1>
                            </div>
                            <div className="headline-on-map">
                                <span className="circle-span"></span>
                                <h1>{t('about.global.map.three.headline')}
                                    <span>{t('about.global.map.three.sub')}</span>
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
