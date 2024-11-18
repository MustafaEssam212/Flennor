
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Brands from '@/utils/brands.json';
import { useTranslation } from 'next-i18next';


const BrandFilter = ({sendDataToParent}) => {
    const { t } = useTranslation('common');
    const { i18n } = useTranslation();
    const [brandSearch, setBrandSearch] = useState('');
    const [brand, setBrand] = useState('');
    const [filtered, setFiltered] = useState(Brands);

    useEffect(() => {
        if (brandSearch.trim() === '') {
            setFiltered(Brands);
        } else {
            const regex = new RegExp(brandSearch, 'i'); // 'i' for case-insensitive matching
            const filteredBrands = Brands.filter(brand => regex.test(brand));
            setFiltered(filteredBrands);
        }
    }, [brandSearch]);

    useEffect(()=> {
        sendDataToParent(brand)
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

                    {filtered.map((e, key) => {
                        return(
                            <div key={key} className="filter-section"><input checked={brand === e} type="checkbox" aria-label={e} title={e} onChange={(s)=> handleChangeInput(s.target.checked, e)} /> <p>{e}</p></div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default BrandFilter;