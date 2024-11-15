import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import productImg from '../../public/category1.jpg';
import DropMenu from "./Dropmenu";
import { useTranslation } from 'next-i18next';


const ProductPopWindow = ({ sendDataToParent }) => {


    const containerRef = useRef();
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { t } = useTranslation('common');


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                sendDataToParent(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sendDataToParent]);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setPosition({ x, y });
    };

    return (
        <div className="product-pop-window-container">
            <div ref={containerRef} className="inner-prodcut-pop-window-container">
                <div className="left-product-pop-window">
                    <div
                        className="img-container"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onMouseMove={handleMouseMove}
                    >
                        {/* Image Container */}
                        <Image
                            src={productImg}
                            alt="Flennor Parts Product Image"
                            title="Flennor Parts Product Image"
                            fill
                        />

                        {/* Zoom Effect */}
                        {isHovered && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    pointerEvents: 'none',
                                    backgroundImage: `url(${productImg.src})`,
                                    backgroundSize: '200%', // Zoom factor
                                    backgroundPosition: `${position.x}% ${position.y}%`,
                                    transition: 'background-position 0.1s ease',
                                }}
                            />
                        )}
                    </div>
                </div>

                <div className="right-product-pop-window">
                    
                    <div className="inner-right-pop">

                        <div className="product-pop-title">
                            <h3>R57914R57914</h3>
                            <h1>Control arm bushing (right)</h1>
                        </div>

                        <div className="product-pop-info">


                            <div className="vechiles-info">
                                <div className="info-header">
                                    <h3>{t('products.popWindow.titleOne')}</h3>
                                </div>

                                <DropMenu />
                                <DropMenu />

                            </div>

                            <div className="oem-nums">
                                <div className="info-header">
                                    <h3>{t('products.popWindow.titleTwo')}</h3>
                                </div>

                                <div className="oem-nums-body">
                                    <div className="oem-record">
                                        <h4>AUDI</h4>
                                        <span>191407182 • 357407182 • 357407182F • 1J0407181 • 1J0407181A</span>
                                    </div>
                                    <div className="oem-record">
                                        <h4>SEAT</h4>
                                        <span>191407182 • 357407182 • 357407182F • 1J0407181 • 1J0407181A</span>
                                    </div>
                                    <div className="oem-record">
                                        <h4>SKODA</h4>
                                        <span>191407182 • 357407182 • 357407182F • 1J0407181 • 1J0407181A</span>
                                    </div>
                                    <div className="oem-record">
                                        <h4>VOLKSWAGEN</h4>
                                        <span>191407182 • 357407182 • 357407182F • 1J0407181 • 1J0407181A</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductPopWindow;
