import YellowShape from "../YellowShape";
import FiveStars from "./Five-Stars";
import Image from "next/image";
import CategoryOnePic from '../../public/category-3-3.png';
import CategoryTwoPic from '../../public/category-1-1.png';
import CategoryThreePic from '../../public/category-4-4.png';
import CategoryFourPic from '../../public/category-2-2.png';
import Link from "next/link";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useTranslation } from 'next-i18next';
import { motion, useInView } from "framer-motion";


const Categories = () => {

    const { t } = useTranslation('common');

     // Variants for animations
     const headerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    const leftToRightVariants = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 }
    };

    const rightToLeftVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="categories-homepage-container">
            {/* Header with bottom-to-top animation */} 
            <motion.div 
                className="categories-homepage-header"
                initial="hidden"
                whileInView="visible"
                variants={headerVariants}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: false }}
            >
                <h1><YellowShape classname={'svg-headline'} /> {t('homepage.categories.mainTitle')} <YellowShape classname={'svg-headline'} /></h1>
                <h3>{t('homepage.categories.subTitle')}</h3>
            </motion.div>

            <div className="categries-section">
                {/* Category sections with alternating animations */}
                <motion.div 
                    className="category-section" 
                    initial="hidden"
                    whileInView="visible"
                    variants={leftToRightVariants}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: false }}
                >
                    <div className="category-img">
                        <Image sizes="(min-width: 2060px) 383px, (min-width: 1940px) 338px, (min-width: 1720px) 315px, (min-width: 1540px) 270px, (min-width: 1280px) 234px, (min-width: 920px) 216px, (min-width: 520px) 40.53vw, 45vw" loading="lazy" src={CategoryOnePic} fill alt={`Flennor Parts ${t('homepage.categories.productOne.name')}`} title={`Flennor Parts ${t('homepage.categories.productOne.name')}`} />
                    </div>
                    <div className="category-info">
                        <FiveStars />
                        <h1>{t('homepage.categories.productOne.name')}</h1>
                        <h2>{t('homepage.categories.productOne.description')}</h2>
                        <Link href={`/products`}>{t('homepage.categories.btn')} <FaArrowAltCircleRight className="icon" /></Link>
                    </div>
                </motion.div>

                <motion.div 
                    className="category-section" 
                    initial="hidden"
                    whileInView="visible"
                    variants={rightToLeftVariants}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                    viewport={{ once: false }}
                >
                    <div className="category-img">
                        <Image sizes="(min-width: 2060px) 383px, (min-width: 1940px) 338px, (min-width: 1720px) 315px, (min-width: 1540px) 270px, (min-width: 1280px) 234px, (min-width: 920px) 216px, (min-width: 520px) 40.53vw, 45vw" loading="lazy" src={CategoryTwoPic} fill alt={`Flennor Parts ${t('homepage.categories.productTwo.name')}`} title={`Flennor Parts ${t('homepage.categories.productTwo.name')}`} />
                    </div>
                    <div className="category-info">
                        <FiveStars />
                        <h1>{t('homepage.categories.productTwo.name')}</h1>
                        <h2>{t('homepage.categories.productTwo.description')}</h2>
                        <Link href={`/products`}>{t('homepage.categories.btn')} <FaArrowAltCircleRight className="icon" /></Link>
                    </div>
                </motion.div>

                <motion.div 
                    className="category-section" 
                    initial="hidden"
                    whileInView="visible"
                    variants={leftToRightVariants}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                    viewport={{ once: false }}
                >
                    <div className="category-img">
                        <Image sizes="(min-width: 2060px) 383px, (min-width: 1940px) 338px, (min-width: 1720px) 315px, (min-width: 1540px) 270px, (min-width: 1280px) 234px, (min-width: 920px) 216px, (min-width: 520px) 40.53vw, 45vw" loading="lazy" src={CategoryThreePic} fill alt={`Flennor Parts ${t('homepage.categories.productThree.name')}`} title={`Flennor Parts ${t('homepage.categories.productThree.name')}`} />
                    </div>
                    <div className="category-info">
                        <FiveStars />
                        <h1>{t('homepage.categories.productThree.name')}</h1>
                        <h2>{t('homepage.categories.productThree.description')}</h2>
                        <Link href={`/products`}>{t('homepage.categories.btn')} <FaArrowAltCircleRight className="icon" /></Link>
                    </div>
                </motion.div>

                <motion.div 
                    className="category-section" 
                    initial="hidden"
                    whileInView="visible"
                    variants={rightToLeftVariants}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
                    viewport={{ once: false }}
                >
                    <div className="category-img">
                        <Image sizes="(min-width: 2060px) 383px, (min-width: 1940px) 338px, (min-width: 1720px) 315px, (min-width: 1540px) 270px, (min-width: 1280px) 234px, (min-width: 920px) 216px, (min-width: 520px) 40.53vw, 45vw" loading="lazy" src={CategoryFourPic} fill alt={`Flennor Parts ${t('homepage.categories.productFour.name')}`} title={`Flennor Parts ${t('homepage.categories.productFour.name')}`} />
                    </div>
                    <div className="category-info">
                        <FiveStars />
                        <h1>{t('homepage.categories.productFour.name')}</h1>
                        <h2>{t('homepage.categories.productFour.description')}</h2>
                        <Link href={`/products`}>{t('homepage.categories.btn')} <FaArrowAltCircleRight className="icon" /></Link>
                    </div>
                </motion.div>
            </div>  
        </div>
    );
}


export default Categories;