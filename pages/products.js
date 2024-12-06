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
import { IoReloadSharp } from "react-icons/io5";
import { jsPDF } from "jspdf";
import LengthGIF from '../public/length.gif';
import { motion } from 'framer-motion';
import FlennorLogo from '../public/flennor-parts-logo.png';
import { NextSeo } from 'next-seo';
import seoConfig from '../next-seo.config';

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}




const Products = () => {

    const router = useRouter();

    const { t } = useTranslation('common');
    const { i18n } = useTranslation();


    const [search, setSearch] = useState(router.query.text ? router.query.text : '');
    const [brandFilter, setBrandFilter] = useState('');
    const [modelFilter, setModelFilter] = useState([]);
    const [cardGird, setCardGrid] = useState(4);
    const [products, setProducts] = useState([]);
    const [openMobileFilters, setOpenMobileFilters] = useState(false);
    const mobileFiltersRef = useRef();
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [productsDisplay, setProductsDisplay] = useState([]);


    const fetchItems = async () => {
        // Get the query parameters from the router
        const { text, brand } = router.query;
    
        // Create a URLSearchParams instance
        const params = new URLSearchParams();
    
        // Append 'text' query if it exists
        if (text) params.append('text', text);
    
        // Append 'brand' query if it exists
        if (brand) params.append('brand', brand);


        const models = Object.keys(router.query)
        .filter(key => key.startsWith('model['))
        .map(key => router.query[key]);
    
        if(models.length > 0){
            models.forEach((m, index) => {
                params.append(`model[${index}]`, m);
            });
        }
    
        // Append 'page' query if it exists
        if (page) params.append('page', page);
        const queryString = params.toString();

        const apiUrl = `/api/getItems?${queryString}&grid=${cardGird}`;
        

        try {
            // Fetch data from the API
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (page === 1) {
                setProductsDisplay(data.products);
            } else {
                setProductsDisplay(prevProducts => [...prevProducts, ...data.products]);
            }
    
            setTotal(data.totalCount);
        } catch (error) {
            console.error('Error fetching items:', error);
            setProductsDisplay([]);
            setTotal(0)
        }

    };


    useEffect(() => {
        if (router.isReady) {
            setPage(1);
            fetchItems();
        }
    }, [router.query, cardGird]);

    useEffect(()=> {
       setBrandFilter('');
       setModelFilter([]);
       setSearch('');
    }, [i18n.language]);
    
    useEffect(() => {
        if (page > 1) {
            fetchItems();
        }
    }, [page]);

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };



    useEffect(() => {

        if (router.isReady) {
            // Check if there's a brand filter or any models selected
            if (brandFilter || modelFilter.length > 0) {
                // Construct the models query dynamically
                const modelsQuery = modelFilter.reduce((acc, model, index) => {
                    acc[`model[${index}]`] = model;
                    return acc;
                }, {});
    
                // Update the URL with the brand and models, using shallow routing
                router.replace(
                    {
                        pathname: '/products',
                        query: {
                            text: router.query.text,
                            ...(brandFilter && { brand: brandFilter }),
                            ...modelsQuery
                        }
                    },
                    undefined,
                    { shallow: true }
                );
            } else{
                    // If filters are cleared, remove them from the URL
                    router.replace(
                        {
                            pathname: '/products',
                            query: {
                                text: router.query.text
                            }
                        },
                        undefined,
                        { shallow: true }
                    );

               }
        }
    }, [brandFilter, modelFilter]);
    

    
    const handleKeyDown = (event) => {
        if(event.keyCode === 13){
            if(search){
                router.replace({
                    pathname: `/products`,
                    query: {
                        ...router.query,
                        text: search
                    }
                },
                undefined,
                { shallow: true })
            }
        }
    }



    const getGridClassName = {
        2: "not-grided",
        3: "two-grided",
        4: "three-grided"
    }

    const getBrandFromComponent = (brand) => {
        setBrandFilter(brand);
    }


    const getModelFromComponent = (models) => {
        setModelFilter(models)
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


    const generatePDF = () => {
        if (products.length <= 0) {
            alert("No products available for the PDF.");
            return;
        }
    
        const doc = new jsPDF();
        const maxLineWidth = 80; // Maximum width for text wrapping
    
        products.forEach((product, index) => {
            if (index > 0) doc.addPage(); // Add a new page for each product


            // Add watermark logo
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();

            // Use the image URL from the imported logo
            const logoUrl = FlennorLogo.src; 

            doc.setGState(new doc.GState({ opacity: 0.1 })); // Set opacity
            doc.addImage(logoUrl, 'PNG', pageWidth / 2 - 40, pageHeight / 2 - 50, 80, 40);
            doc.setGState(new doc.GState({ opacity: 1 })); // Reset opacity
    
            // Product Image (Increased size)
            const imageUrl = `/api/getImage?productId=${product.productId}&image=${product.image}`;
            doc.addImage(imageUrl, "JPEG", 10, 10, 100, 70); // Updated dimensions for larger image
    
            // Product Details
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.setTextColor("#FFD700");
            doc.text(product.partNum || "Unknown Part Number", 120, 20); // Part number in yellow
    
            doc.setFontSize(14);
            doc.setTextColor("#000");
            doc.text(product.partName || "Unknown Part Name", 120, 30); // Part name
            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
    
            // Vehicle Information Header
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("Vehicle Information", 10, 90);
    
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");
    
            // Vehicle Information Table
            let yPosition = 100; // Start position for vehicle info
            const vehiclesInfo = product.vehiclesInfo || {}; // Default to empty object if missing
            Object.keys(vehiclesInfo).forEach((brand) => {
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.text(brand, 10, yPosition);
                yPosition += 5;
    
                const models = vehiclesInfo[brand] || {}; // Default to empty object if missing
                Object.keys(models).forEach((model) => {
                    const info = models[model] || {};
    
                    doc.setFontSize(8);
                    doc.setFont("helvetica", "normal");
    
                    // Model
                    doc.text(`Model: ${info.model || "N/A"}`, 20, yPosition);
    
                    // Engine Type (wrapped text)
                    const engineType = info.engineType || "N/A";
                    const wrappedEngineType = doc.splitTextToSize(`Engine Type: ${engineType}`, maxLineWidth);
                    doc.text(wrappedEngineType, 60, yPosition);
    
                    // Move yPosition based on wrapped text
                    yPosition += 10 * wrappedEngineType.length;
    
                    // Engine No
                    doc.text(`Engine No: ${info.engineNo || "N/A"}`, 140, yPosition);
    
                    yPosition += 10;
    
                    // Year
                    doc.text(`Year: ${info.year || "N/A"}`, 20, yPosition);
    
                    // Additional Info (wrapped text)
                    const additionalInfo = info.additionalInfo || "N/A";
                    const wrappedAdditionalInfo = doc.splitTextToSize(`Additional Info: ${additionalInfo}`, maxLineWidth);
                    doc.text(wrappedAdditionalInfo, 60, yPosition);
    
                    yPosition += 10 * wrappedAdditionalInfo.length; // Adjust for wrapped lines
                });
                yPosition += 5;
            });
    
            // O.E.M Numbers Section
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text("O.E.M Numbers", 10, yPosition); // Add O.E.M Numbers header
            yPosition += 10;
    
            const brands = product.brands || []; // Default to an empty array
            brands.forEach((brand) => {
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.text(brand || "Unknown Brand", 10, yPosition + 5); // Display brand name
                yPosition += 5;
    
                // Ensure product.models and product.brandsOems are defined
                const models = product.models?.[brand];
                const oems = product.brandsOems?.[brand] && product.brandsOems?.[brand].length > 0
                    ? product.brandsOems?.[brand]
                    : product.oemNums; // Fallback to general O.E.M numbers
    
                doc.setFont("helvetica", "normal");
    
                // Display Models
                doc.setFontSize(9);
                const wrappedModels = doc.splitTextToSize(`MODELS: ${models.join(" • ") || "N/A"}`, maxLineWidth);
                doc.text(wrappedModels, 20, yPosition + 5);
                yPosition += 5 * wrappedModels.length;
    
                // Display O.E.M Numbers
                const wrappedOems = doc.splitTextToSize(`O.E.M: ${oems.join(" • ") || "N/A"}`, maxLineWidth);
                doc.text(wrappedOems, 20, yPosition + 5);
                yPosition += 10 * wrappedOems.length;
            });
        });
    
        doc.save("flennor-parts-products.pdf");
    };


    const slideVariants = {
        open: { x: 0, transition: { duration: 0.5 } }, // Slide in from the left
        closed: { x: '-100%', transition: { duration: 0.5 } } // Slide out to the left
    };


    const handleSelectAll = () => {
        if(products.length === productsDisplay.length){
            setProducts([]);
        }else{
            setProducts(productsDisplay)
        }
    }

    return(
        <div  className="products-page-container">

            <NextSeo
                {...seoConfig}
                title="Online Catalog - Flennor Automotive Parts"
            />
    
            <div className='products-header'>
                <div className='img-container'>
                    <Image sizes="100vw" priority src={FlennorProductsImg} fill style={{objectFit: 'cover'}} alt='Flennor Parts Cover' title='Flennor Parts Cover' />
                </div>

                <div className='input-container'>
                    <div className='inner-input-container'>
                        <IoSearchOutline className='icon' />
                        <input onKeyDown={handleKeyDown} placeholder={t('homepage.intro.inputPlaceholder')} value={search} onChange={(s)=> setSearch(s.target.value)} aria-label='Flennor Parts Search' alt='Flennor Parts Search' title='Flennor Parts Search' />
                        <button onClick={()=> {
                            router.replace({
                                pathname: `/products`,
                                query: {
                                    ...router.query,
                                    text: search
                                }
                            },
                            undefined,
                            { shallow: true })
                        }} aria-label='Flennor Parts Search'>{t('homepage.intro.btn')}</button>
                    </div>
                </div>
            </div>

            <div className='products-nav'>
                <h1><span>{total}</span> {t('products.productsNav.productListed')}</h1>
                <div className='products-nav-btns'>
                    <button onClick={generatePDF} aria-label='Create Products PDF On Flennor Parts' className='pdf-btn'><FaRegFilePdf className='pdf-icon icon' /> {t('products.productsNav.createPDF')} ({products.length})</button>
                    <button onClick={handleSelectAll} aria-label='Select all products' className='pdf-btn'>{t('products.productsNav.select')} ({productsDisplay.length})</button>
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


                        {
                            productsDisplay.map((e, key) => {
                                return(
                                    <ProductCard key={key} data={e} sendDataToParent={getProductFromCard} grid={cardGird} checked={products.some((check) => check.productId === e.productId)} />
                                )
                            })
                        }


                        {
                            productsDisplay.length <= 0 &&   <div className='no-length'><h1><Image src={LengthGIF} alt='Flennor Parts GIF' title='No Available Products in Flennor Parts' width={120} height={120} /> {t('alerts.noLength')}</h1></div>
                        }

                    </div>


               </div>
            </div>

            
            {
                productsDisplay.length !== total && <div className='load-more'>
                    <button onClick={handleLoadMore} aria-label='Load More Flennor Parts Products'><IoReloadSharp className='icon' /> {t('products.loadMore')}</button>
                </div> 
            }


            <motion.div
                className="mobile-filters"
                initial="closed"
                animate={openMobileFilters ? 'open' : 'closed'}
                variants={slideVariants}
            >
                <div ref={mobileFiltersRef} className="inner-mobile-filter">
                    <div className="grid-filter">
                        <h2>{t('products.mobileFilter.align')}</h2>
                        <div className="grid-btns">
                            <button
                                onClick={() => setCardGrid(2)}
                                aria-label="Flennor Parts Products Grid"
                                title="Flennor Parts Products Grid"
                            >
                                <TfiLayoutGrid2Alt className="grid-icon icon" />
                            </button>
                            <button
                                onClick={() => setCardGrid(3)}
                                aria-label="Flennor Parts Products Grid"
                                title="Flennor Parts Products Grid"
                            >
                                <TfiLayoutGrid3Alt className="grid-icon icon" />
                            </button>
                            <button
                                onClick={() => setCardGrid(4)}
                                aria-label="Flennor Parts Products Grid"
                                title="Flennor Parts Products Grid"
                            >
                                <TfiLayoutGrid4Alt className="grid-icon icon" />
                            </button>
                        </div>
                    </div>
                    <BrandFilter sendDataToParent={getBrandFromComponent} />
                    <ModelFilter brand={brandFilter} sendDataToParent={getModelFromComponent} />
                    <button className="pdf-btn">
                        <FaRegFilePdf className="pdf-icon icon" /> {t('products.productsNav.createPDF')} ({products.length})
                    </button>
                    <button style={{marginTop: '5px'}} onClick={handleSelectAll} aria-label='Select all products' className='pdf-btn'>{t('products.productsNav.select')} ({productsDisplay.length})</button>
                </div>
            </motion.div>


        </div>
    )
}


export default Products;