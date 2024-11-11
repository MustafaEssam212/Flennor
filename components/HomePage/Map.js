
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import MapImg from '../../public/map.png';
import { useTranslation } from 'next-i18next';


const Map = () => {
    const { t } = useTranslation('common');
    // Variants for animations
    const headerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };


    return(
        <div className="map-homepage-container">
           

            <div className="inner-map-homepage-container">

            <motion.div 
                className="map-homepage-header"
                initial="hidden"
                whileInView="visible"
                variants={headerVariants}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: false }}
            >
                <h1>{t('homepage.map.title')}</h1>
                <h3>{t('homepage.map.subTitle')}</h3>
            </motion.div>
                <div className="map-img"><Image src={MapImg} fill alt="Flennor Parts Spread Map" title="Flennor Parts Spread Map" /></div>
            </div>
        </div>
    )
}


export default Map;