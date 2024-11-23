import React from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { useState, useEffect } from "react";   
import { useTranslation } from 'next-i18next';

const ProductPopWindow = dynamic(() => import('@/components/Products/ProductPopWindow'));


const ProductCard = ({grid, sendDataToParent, checked, data}) =>{

    const [openPopWindow, setOpenPopWindow] = useState(false);
    const getDataFromPop = (param) => {
        setOpenPopWindow(param)
    }
    const { i18n } = useTranslation();

    const getName = {
        'en': data.partName,
        'de': data.partNameDe,
        'ar': data.partNameAr
    }

    const useWindowWidth = () => {
        // State to store the window width
        const [windowWidth, setWindowWidth] = useState(undefined);
      
        useEffect(() => {
          // Handler to update the width
          const handleResize = () => {
            setWindowWidth(window.innerWidth);
          };
      
          // Set the initial width
          handleResize();
      
          // Add event listener
          window.addEventListener('resize', handleResize);
      
          // Cleanup on component unmount
          return () => window.removeEventListener('resize', handleResize);
        }, []); // Runs only on mount and unmount
      
        return windowWidth;
    };


    const width = useWindowWidth();


    const getHeight = (width, grid) => {
        if (width > 1280) {
          return `calc(100vh / ${grid} / 1)`;
        } else if (width < 517) {
            return `calc(100vh / ${grid} / 2.5)`;
          } else if (width < 900) {
          return `calc(100vh / ${grid} / 1.5)`;
        } else {
          return `calc(100vh / ${grid})`; // Default for widths between 900 and 1500
        }
      };

    return(
        <div className="product-card-component" style={{width: `calc(100% / ${grid})`}}>

  


            {openPopWindow && <ProductPopWindow data={data} sendDataToParent={getDataFromPop} />}

            <div className="top-product-card">
                <div className="part-num-checkbox">
                    <input onChange={(s)=> sendDataToParent(s.target.checked, data)} checked={checked} type="checkbox" title="check flennor parts product" aria-label="check flennor parts product"  />
                    <h2>{data.partNum}</h2>
                </div>
                <div onClick={()=> setOpenPopWindow(true)} className="img-container" style={{ height: getHeight(width, grid) }}><Image loading="lazy" src={`/api/getImage?productId=${data.productId}&image=${data.image}`} alt="Flennor Parts Product" title="Flennor Parts Product" fill /></div>
                <div className="title-card">
                    <h2 onClick={()=> setOpenPopWindow(true)}>{getName[i18n.language]}</h2>
                </div>
            </div>

            <div className="bottom-product-card">

                {
                    data.brands.map((e, key) => {
                        return(
                            <div key={key} className="model-brand-oem">
                                <div className="content-product">
                                    <h3>{e}</h3> 
                                    <span>{data.models[e]?.map((model, modelKey) => (
                                        <React.Fragment key={modelKey}>
                                            {model}
                                            {modelKey !== data.models[e].length - 1 && ' • '}
                                        </React.Fragment>
                                    ))}</span>
                                </div>
                                <div className="content-product">
                                    <h3>O.E.M</h3>

                                    {
                                        data.brandsOems && data.brandsOems[e] && data.brandsOems[e].length > 0 ? <span>{data.brandsOems[e].map((brandOem, brandOemKey) => {
                                            return(
                                                <React.Fragment key={brandOemKey}>
                                                    {brandOem}
                                                    {brandOemKey !== data.brandsOems[e].length - 1 && ' • '}
                                                </React.Fragment>
                                            )
                                        })}</span> : <span>{data.oemNums.map((brandOem, brandOemKey) => {
                                            return(
                                                <React.Fragment key={brandOemKey}>
                                                    {brandOem}
                                                    {brandOemKey !== data.oemNums.length - 1 && ' • '}
                                                </React.Fragment>
                                            )
                                        })}</span>
                                    }


                                </div>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}


export default ProductCard;