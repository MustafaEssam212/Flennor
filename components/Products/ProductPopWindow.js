import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import productImg from '../../public/category1.jpg';
import DropMenu from "./Dropmenu";
import { useTranslation } from 'next-i18next';
import React from "react";

const ProductPopWindow = ({ sendDataToParent, data }) => {


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
                            src={`/api/getFullImage?productId=${data.productId}&image=${data.image}`}
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
                                    backgroundImage: `url(${`/api/getFullImage?productId=${data.productId}&image=${data.image}`})`,
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
                            <h3>{data.partNum}</h3>
                            <h1>{data.partName}</h1>
                        </div>

                        <div className="product-pop-info">


                            <div className="vechiles-info">
                                <div className="info-header">
                                    <h3>{t('products.popWindow.titleOne')}</h3>
                                </div>


                
                               
                                {
                                   data.brands.map((brand, key) => {
                                    return(
                                        <DropMenu key={key} data={{brand, obj: data.vehiclesInfo[brand]}} />
                                    )
                                   })
                                }


                            </div>

                            <div className="oem-nums">
                                <div className="info-header">
                                    <h3>{t('products.popWindow.titleTwo')}</h3>
                                </div>

                                <div className="oem-nums-body">

                                    {
                                        data.brands.map((brand, key) => {
                                            return(
                                                <div key={key} className="oem-record">
                                                    <h4>{brand}</h4>
                                                    {
                                                        data.brandsOems && data.brandsOems[brand] && data.brandsOems[brand].length > 0 ? <span>{data.brandsOems[brand].map((brandOem, brandOemKey) => {
                                                            return(
                                                                <React.Fragment key={`${key}-${brandOemKey}`}>
                                                                    {brandOem}
                                                                    {brandOemKey !== data.brandsOems[brand].length - 1 && ' • '}
                                                                </React.Fragment>
                                                            )
                                                        })}</span> : <span>{data.oemNums.map((brandOem, brandOemKey) => {
                                                            return(
                                                                <React.Fragment key={`${key}-${brandOemKey}`}>
                                                                    {brandOem}
                                                                    {brandOemKey !== data.oemNums.length - 1 && ' • '}
                                                                </React.Fragment>
                                                            )
                                                        })}</span>
                                                    }
                                                </div>
                                            )
                                        })
                                    }

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
