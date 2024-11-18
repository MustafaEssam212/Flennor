import React from "react";
import Image from "next/image";
import productImg from '../../public/product.png';
import dynamic from 'next/dynamic';
import { useState } from "react";

const ProductPopWindow = dynamic(() => import('@/components/Products/ProductPopWindow'));


const ProductCard = ({screenWidth, grid, sendDataToParent, checked, data}) =>{

    const [openPopWindow, setOpenPopWindow] = useState(false);
    const getDataFromPop = (param) => {
        setOpenPopWindow(param)
    }

    return(
        <div className="product-card-component" style={{width: `calc(100% / ${grid})`}}>



            {openPopWindow && <ProductPopWindow data={data} sendDataToParent={getDataFromPop} />}

            <div className="top-product-card">
                <div className="part-num-checkbox">
                    <input onChange={(s)=> sendDataToParent(s.target.checked, data)} checked={checked} type="checkbox" title="check flennor parts product" aria-label="check flennor parts product"  />
                    <h2>{data.partNum}</h2>
                </div>
                <div onClick={()=> setOpenPopWindow(true)} className="img-container" style={screenWidth > 627 ? {height: `calc(100vh / (${grid}))`} : {height: `calc(100vh / (${grid} /.5))`}}><Image loading="lazy" src={`/api/getImage?productId=${data.productId}&image=${data.image}`} alt="Flennor Parts Product" title="Flennor Parts Product" fill /></div>
                <div className="title-card">
                    <h2 onClick={()=> setOpenPopWindow(true)}>{data.partName}</h2>
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