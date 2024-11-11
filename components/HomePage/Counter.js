// Counter.js
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import Image from 'next/image';
import { useEffect, useRef, useState } from "react";
import YellowShape from '../YellowShape';
import QualityImg from '../../public/icons/quality.gif';
import ClientsImg from '../../public/icons/clients.gif';
import ProductsImg from '../../public/icons/products.gif';
import ExperienceImg from '../../public/icons/experience.gif';
import EmployeeImg from '../../public/icons/employee.gif';
import ExportImg from '../../public/icons/export.gif';
import { useTranslation } from 'next-i18next';

// CounterItem Component
const CounterItem = ({ img, count, label, suffix, delay }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: '-100px' }); // Trigger on every scroll focus

    const motionValue = useMotionValue(0);
    const rounded = useTransform(motionValue, latest => Math.round(latest));
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (isInView) {
            // Reset and re-animate on each scroll focus
            motionValue.set(0);
            animate(motionValue, count, { duration: 2, delay: delay });
        }
    }, [isInView, motionValue, count, delay]);

    useEffect(() => {
        const unsubscribe = rounded.onChange((latest) => {
            setCurrent(latest);
        });
        return () => unsubscribe();
    }, [rounded]);

    return (
        <motion.div
            className='counter'
            ref={ref}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 1,
                ease: "easeOut",
                delay: delay
            }}
        >
            <Image unoptimized src={img} width={120} height={120} alt={label} />
            <h1>{current}{suffix}</h1>
            <h3>{label}</h3>
        </motion.div>
    );
};

// Main Counter Component
const Counter = () => {
    const { t } = useTranslation('common');

    const counters = [
        { img: ClientsImg, count: 150, label: t('homepage.counter.clients'), suffix: "+" },
        { img: ProductsImg, count: 10000, label: t('homepage.counter.products'), suffix: "+" },
        { img: ExperienceImg, count: 89, label: t('homepage.counter.experienceYears'), suffix: "+" },
        { img: EmployeeImg, count: 250, label: t('homepage.counter.employees'), suffix: "+" },
        { img: QualityImg, count: 100, label: t('homepage.counter.quality'), suffix: "%" },
        { img: ExportImg, count: 5, label: t('homepage.counter.countries'), suffix: "" }
    ];


    const headerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="counter-homepage-container">

            <div className='counters-inner-container'>
                {counters.map((counter, index) => (
                    <CounterItem
                        key={index}
                        img={counter.img}
                        count={counter.count}
                        label={counter.label}
                        suffix={counter.suffix}
                        delay={0.2 + index * 0.1} // Incremental delay
                    />
                ))}
            </div>
        </div>
    );
};

export default Counter;