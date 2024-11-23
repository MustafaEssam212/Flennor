import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from 'next-i18next';  


const ModelFilter = ({brand, sendDataToParent}) => {

    const { t } = useTranslation('common');
    const [modelSearch, setModelSearch] = useState('');
    const [models, setModels] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const { i18n } = useTranslation();
    const isFirstRender = useRef(true);
    const [Brands, setBrands] = useState([]);


    useEffect(()=> {
        const getBrands = async () => {
            const res = await fetch(`/api/getBrands`);
            const dataOfResponse = await res.json();

            if(res.status === 200){
                setBrands(dataOfResponse);
            }
        }

        getBrands();
    }, []);


    useEffect(() => {
        if(brand){
            setFiltered(Brands.find((e)=> e.brand === brand).models);
            setModels([]);
        }
    }, [brand]);


    useEffect(() => {
        // Skip execution on the first render
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        sendDataToParent(models, isFirstRender);
    }, [models]);


    useEffect(()=> {
        if(brand){
            if (modelSearch.trim() === '') {
                setFiltered(Brands.find((e)=> e.brand === brand).models);
            } else {
                const regex = new RegExp(modelSearch, 'i');
                const filterModels = Brands.find((e)=> e.brand === brand).models;
                const filteredModelOfSearch = filterModels.filter(model => regex.test(model));
                setFiltered(filteredModelOfSearch);
            }
        }
    }, [modelSearch]);

    useEffect(()=> {
        setModels([]);
     }, [i18n.language]);


    const handleChangeInput = (event, name) => {
        if(event){
            setModels([...models, name]);
        }else{
            const filterNames = models.filter((e) => e !== name);
            setModels(filterNames);
        }
    }

    return(
        <div className="model-filter-component filter-checkboxes-component">
            <div className="filter-header">
                <h1>{t('products.modelFilter.title')}</h1>
            </div>

            <div className="filter-body">

                {
                    !brand ? <div className="filter-alert"><p>{t('products.modelFilter.noBrand')}</p></div> :  <>
                
                    <div className="filter-body-search">
                        <IoSearchOutline className="icon" />
                        <input value={modelSearch} placeholder={t('products.modelFilter.inputPlaceholder')} title={t('products.modelFilter.inputPlaceholder')} aria-label={t('products.modelFilter.inputPlaceholder')} onChange={(s)=>setModelSearch(s.target.value)} />
                        {modelSearch && <button onClick={()=> setModelSearch('')} aria-label="Clear brand search" title="Clear brand search">x</button>}
                    </div>
    
                    <div className="filter-body-content">
                     
                        {filtered.map((e, key) => {
                            return(
                                <div key={key} className="filter-section"><input checked={models.includes(e)} type="checkbox" aria-label={e} title={e} onChange={(s)=> handleChangeInput(s.target.checked, e)} /> <p>{e}</p></div>
                            )
                        })}
                    </div>
                    
                    </>
                }

            </div>
        </div>
    )
}

export default ModelFilter;