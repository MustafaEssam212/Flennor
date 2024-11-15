
import Image from "next/image";
import productImg from '../../public/product.png';
import dynamic from 'next/dynamic';
import { useState } from "react";

const ProductPopWindow = dynamic(() => import('@/components/Products/ProductPopWindow'));


const ProductCard = ({grid, sendDataToParent, checked, data}) =>{

    const [openPopWindow, setOpenPopWindow] = useState(false);
    const getDataFromPop = (param) => {
        setOpenPopWindow(param)
    }

    return(
        <div className="product-card-component" style={{width: `calc(100% / ${grid})`}}>

            {openPopWindow && <ProductPopWindow sendDataToParent={getDataFromPop} />}

            <div className="top-product-card">
                <div className="part-num-checkbox">
                    <input onChange={(s)=> sendDataToParent(s.target.checked, data)} checked={checked} type="checkbox" title="check flennor parts product" aria-label="check flennor parts product"  />
                    <h2>R15863/HP</h2>
                </div>
                <div onClick={()=> setOpenPopWindow(true)} className="img-container" style={{height: `calc(100vh / (${grid}))`}}><Image loading="lazy" src={productImg} alt="Flennor Parts Product" title="Flennor Parts Product" fill /></div>
                <div className="title-card">
                    <h2 onClick={()=> setOpenPopWindow(true)}>AIR BLEEDING PUMP (8mm x 8mm)</h2>
                </div>
            </div>

            <div className="bottom-product-card">
                <div className="model-brand-oem">
                    <div className="content-product">
                        <h3>OPEL</h3> 
                        <span>E60 • E60N • E61 • E61N • E63 • E63N • E64 • E64N</span>
                    </div>
                    <div className="content-product">
                        <h3>O.E.M</h3>
                        <span>4F0919133B • 4F0919133A • 4F0919133 • 90512483 • 1337328 • 9013230288</span>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default ProductCard;