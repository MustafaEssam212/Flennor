import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import FlennorProductsImg from '../public/products.jpg';
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from 'react';
import { FaRegFilePdf } from "react-icons/fa6";
import { TfiLayoutGrid2Alt, TfiLayoutGrid3Alt, TfiLayoutGrid4Alt } from "react-icons/tfi";
import BrandFilter from '@/components/Products/BrandFilter';
import ModelFilter from '@/components/Products/ModelFilter';
import ProductCard from '@/components/Products/ProductCard';
import { HiBars4 } from "react-icons/hi2";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const Products = () => {

    const router = useRouter();
    const { car, color } = router.query;
    const { t } = useTranslation('common');



    const [search, setSearch] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [modelFilter, setModelFilter] = useState([]);
    const [cardGird, setCardGrid] = useState(2);
    const [products, setProducts] = useState([]);
    const [openMobileFilters, setOpenMobileFilters] = useState(false);
    const mobileFiltersRef = useRef();

    const getGridClassName = {
        2: "not-grided",
        3: "two-grided",
        4: "three-grided"
    }

    const getBrandFromComponent = (brand) => {
        setBrandFilter(brand);
    }


    const getModelFromComponent = (models) => {
        setModelFilter(models);
    }

    const getProductFromCard = (event, productObj) => {
        if(event){
            setProducts([...products, productObj])
        }else{
            const filterProducts = products.filter((e) => e.productId !== productObj.productId);
            setProducts(filterProducts);
        }
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileFiltersRef.current && !mobileFiltersRef.current.contains(event.target)) {
                setOpenMobileFilters(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return(
        <div className="products-page-container">
            <div className='products-header'>
                <div className='img-container'>
                    <Image src={FlennorProductsImg} fill style={{objectFit: 'cover'}} alt='Flennor Parts Cover' title='Flennor Parts Cover' />
                </div>

                <div className='input-container'>
                    <div className='inner-input-container'>
                        <IoSearchOutline className='icon' />
                        <input placeholder={t('homepage.intro.inputPlaceholder')} onChange={(s)=> setSearch(s.target.value)} aria-label='Flennor Parts Search' alt='Flennor Parts Search' title='Flennor Parts Search' />
                        <button aria-label='Flennor Parts Search'>{t('homepage.intro.btn')}</button>
                    </div>
                </div>
            </div>

            <div className='products-nav'>
                <h1><span>10617</span> {t('products.productsNav.productListed')}</h1>
                <div className='products-nav-btns'>
                    <button className='pdf-btn'><FaRegFilePdf className='pdf-icon icon' /> {t('products.productsNav.createPDF')} ({products.length})</button>
                    <div className='grid-btns'>
                        <button onClick={()=> setCardGrid(2)} aria-label='Flennor Parts Products Grid' title='Flennor Parts Products Grid'><TfiLayoutGrid2Alt className='grid-icon icon'/></button>
                        <button onClick={()=> setCardGrid(3)} aria-label='Flennor Parts Products Grid' title='Flennor Parts Products Grid'><TfiLayoutGrid3Alt className='grid-icon icon'/></button>
                        <button onClick={()=> setCardGrid(4)} aria-label='Flennor Parts Products Grid' title='Flennor Parts Products Grid'><TfiLayoutGrid4Alt className='grid-icon icon'/></button>
                    </div>
                </div>
                <div className='bars' onClick={()=> setOpenMobileFilters(true)}><HiBars4 className='icon-bars' /></div>
            </div>


            <div className='products-body'>
               <div className='inner-products-body'>

                    <div className='products-filter'>
                        <BrandFilter sendDataToParent={getBrandFromComponent} />
                        <ModelFilter brand={brandFilter} sendDataToParent={getModelFromComponent} />
                    </div>

                    <div className={`products-content ${getGridClassName[cardGird]}`}>
                        <ProductCard data={{productId: 1}} sendDataToParent={getProductFromCard} grid={cardGird} checked={products.some((e) => e.productId === 1)} />
                        <ProductCard data={{productId: 2}} sendDataToParent={getProductFromCard} grid={cardGird} checked={products.some((e) => e.productId === 2)} />
                        <ProductCard data={{productId: 3}} sendDataToParent={getProductFromCard} grid={cardGird} checked={products.some((e) => e.productId === 3)} />
                        <ProductCard data={{productId: 4}} sendDataToParent={getProductFromCard} grid={cardGird} checked={products.some((e) => e.productId === 4)} />
                        <ProductCard data={{productId: 5}} sendDataToParent={getProductFromCard} grid={cardGird} checked={products.some((e) => e.productId === 5)} />
                    </div>


               </div>
            </div>

            {
                openMobileFilters &&  <div className='mobile-filters'>
                <div ref={mobileFiltersRef} className='inner-mobile-filter'>

                    <div className='grid-filter'>

                        <h2>Alignment</h2>
                        <div className='grid-btns'>
                            <button onClick={()=> setCardGrid(2)} aria-label='Flennor Parts Products Grid' title='Flennor Parts Products Grid'><TfiLayoutGrid2Alt className='grid-icon icon'/></button>
                            <button onClick={()=> setCardGrid(3)} aria-label='Flennor Parts Products Grid' title='Flennor Parts Products Grid'><TfiLayoutGrid3Alt className='grid-icon icon'/></button>
                            <button onClick={()=> setCardGrid(4)} aria-label='Flennor Parts Products Grid' title='Flennor Parts Products Grid'><TfiLayoutGrid4Alt className='grid-icon icon'/></button>
                        </div>
                    </div>

                    <BrandFilter sendDataToParent={getBrandFromComponent} />
                    <ModelFilter brand={brandFilter} sendDataToParent={getModelFromComponent} />

                    <button className='pdf-btn'><FaRegFilePdf className='pdf-icon icon' /> {t('products.productsNav.createPDF')} ({products.length})</button>
                </div>
            </div>
            }
        </div>
    )
}


export default Products;