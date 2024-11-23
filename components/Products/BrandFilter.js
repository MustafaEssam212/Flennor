
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from 'next-i18next';


const BrandFilter = ({sendDataToParent}) => {
    const { t } = useTranslation('common');
    const { i18n } = useTranslation();
    const [brandSearch, setBrandSearch] = useState('');
    const [brand, setBrand] = useState('');
    const [Brands, setBrands] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const isFirstRender = useRef(true);
    const [loading, setLoading] = useState(true);


    useEffect(()=> {
        const getBrands = async () => {
            const res = await fetch(`/api/getBrands`);
            const dataOfResponse = await res.json();

            if(res.status === 200){
                setBrands(dataOfResponse);
                setLoading(false);
            }
        }

        getBrands();
    }, []);

    useEffect(()=> {
        if(Brands.length){
            setFiltered(Brands)
        }
    }, [Brands])

    useEffect(() => {
        if (brandSearch.trim() === '') {
            setFiltered(Brands);
        } else {
            const regex = new RegExp(brandSearch, 'i'); // 'i' for case-insensitive matching
            const filteredBrands = Brands.filter(brand => regex.test(brand.brand));
            setFiltered(filteredBrands);
        }
    }, [brandSearch]);

    useEffect(()=> {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        sendDataToParent(brand);
    }, [brand]);


    useEffect(()=> {
        setBrand('');
     }, [i18n.language]);


    const handleChangeInput = (event, name) => {
        if(event){
            setBrand(name);
        }else{
            setBrand('');
        }
    }

    return(
        <div className="brand-filter-component filter-checkboxes-component">
            <div className="filter-header">
                <h1>{t('products.brandFilter.title')}</h1>
            </div>

            <div className="filter-body">
                <div className="filter-body-search">
                    <IoSearchOutline className="icon" />
                    <input value={brandSearch} placeholder={t('products.brandFilter.inputPlaceholder')} title={t('products.brandFilter.inputPlaceholder')} aria-label={t('products.brandFilter.inputPlaceholder')} onChange={(s)=>setBrandSearch(s.target.value)} />
                    {brandSearch && <button onClick={()=> setBrandSearch('')} aria-label="Clear brand search" title="Clear brand search">x</button>}
                </div>

                <div className="filter-body-content">

      

                    {
                       loading ? <div className="filter-alert"><p>{t('alerts.loading')}</p></div> : <>
                       
                       {filtered.map((e, key) => {
                        return(
                            <div key={key} className="filter-section"><input checked={brand === e.brand} type="checkbox" aria-label={e.brand} title={e.brand} onChange={(s)=> handleChangeInput(s.target.checked, e.brand)} /> <p>{e.brand}</p></div>
                        )
                    })}
                        
                       
                       </>
                    }
                </div>
            </div>
        </div>
    )
}


export default BrandFilter;