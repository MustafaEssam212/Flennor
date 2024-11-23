import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import DropMenu from "./Dropmenu";
import { useTranslation } from 'next-i18next';
import React from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
    

const ProductPopWindow = ({ sendDataToParent, data }) => {


    const containerRef = useRef();
    const [isHovered, setIsHovered] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { t } = useTranslation('common');
    const carouselRef = useRef();

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


    const scrollCarousel = (direction) => {
        const scrollAmount = 300; // Adjust this value based on how far you want to scroll
        if (direction === "left") {
          carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
          carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      };


      const [chosenPic, setChosenPic] = useState(data.image)

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
                            src={`/api/getFullImage?productId=${data.productId}&image=${chosenPic}`}
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
                                    backgroundImage: `url(${`/api/getFullImage?productId=${data.productId}&image=${chosenPic}`})`,
                                    backgroundSize: '200%', // Zoom factor
                                    backgroundPosition: `${position.x}% ${position.y}%`,
                                    transition: 'background-position 0.1s ease',
                                }}
                            />
                        )}
                    </div>

                    <div className="carousel">
                        <button onClick={() => scrollCarousel("left")} aria-label="Flennor Parts Product Carousel"><FaArrowAltCircleLeft className="icon" /></button>


                            <div ref={carouselRef} className="inner-carousel">


                            <div onClick={()=> setChosenPic(data.image)} className={chosenPic === data.image ? "img-preview active" : "img-preview"}>
                                <Image src={`/api/getFullImage?productId=${data.productId}&image=${data.image}`} alt="Flennor Parts Product Image" title="Flennor Parts Product Image" fill />
                            </div>

                                    {
                                        data.images.map((e, key) => {
                                            return(
                                                <div onClick={()=> setChosenPic(e)} key={key} className={chosenPic === e ? "img-preview active" : "img-preview"}>
                                                    <Image src={`/api/getImage?productId=${data.productId}&image=${e}`} alt="Flennor Parts Product Image" title="Flennor Parts Product Image" fill />
                                                </div>
                                            )
                                        })
                                    }

                            </div>


                        <button onClick={() => scrollCarousel("right")} aria-label="Flennor Parts Product Carousel"><FaArrowAltCircleRight className="icon" /></button>
                    </div>
                </div>

                <div className="right-product-pop-window">

                    <div className="inner-right-pop">

                        <div className="product-pop-title">
                            <h3>{data.partNum}</h3>
                            <h1>{data.partName}</h1>
                        </div>

                        <div className="product-pop-info">

                            {
                                data.notes && <div className="notes-info">
                                        <div className="info-header">
                                            <h3>{t('products.popWindow.titleThree')}</h3>
                                        </div>

                                        <h4>{data.notes}</h4>
                                    </div>
                            }

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
