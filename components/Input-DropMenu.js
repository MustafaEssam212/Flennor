
import { useState, useRef, useEffect } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup  } from "react-icons/io";
import CountryList from 'country-list-with-dial-code-and-flag';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';


const InputDropMenu = ({defaultValue, type, sendDataToParent}) => {
    const { t } = useTranslation('common');
    const [openMenu, setOpenMenu] = useState(false);
    const [menuTop, setMenuTop] = useState(0);
    const countries = CountryList.getAll();
    const sortedCountries = countries.sort((a, b) => {
      return a.data.name.localeCompare(b.data.name);
    });
    const mainValueRef = useRef();
    const optionsRef = useRef();
    const { i18n } = useTranslation();


    useEffect(() => {
        if (mainValueRef.current) {
            setMenuTop(mainValueRef.current.offsetHeight); // Set top value dynamically
        }
    }, [mainValueRef.current?.offsetHeight]);


    useEffect(() => {
        const handleClickOutside = (event) => {
          if (optionsRef.current && !optionsRef.current.contains(event.target)) {
            setOpenMenu(false);
          }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [openMenu]);


      const getDefaultValue = () => {
        if(type === 'regular'){

          if(defaultValue === 'MR.' || defaultValue === 'السّيد' || defaultValue === 'HERR.'){
            return t('contact.body.content.form.dropmenu.mr')
          }else{
            return t('contact.body.content.form.dropmenu.mrs')
          }

        }else{
          if(defaultValue){
            return defaultValue;
          }else{
            return t('contact.body.content.form.dropmenu.code');
          }
        }
      }

    return(
        <div className="input-dropmenu-container">

                <div ref={mainValueRef} onClick={()=> setOpenMenu(!openMenu)} className='main-dropmenu-value'>
                    <p>{getDefaultValue()}</p>
                    {openMenu ? <IoMdArrowDropup className='icon' /> : <IoMdArrowDropdown className='icon' />}
                </div>

                {
                    openMenu &&  <div ref={optionsRef} style={{ top: `${menuTop}px` }}className='dropmenu-options'>
                        {
                          type === 'regular' ? <>
                              <button aria-label='MR.' onClick={()=> {sendDataToParent('MR.', type); setOpenMenu(false)}}>{t('contact.body.content.form.dropmenu.mr')}</button>
                              <button aria-label='MRS.' onClick={()=> {sendDataToParent('MRS.', type); setOpenMenu(false)}}>{t('contact.body.content.form.dropmenu.mrs')}</button>
                          </> : 
                          <>
                            
                            {
                              sortedCountries.map((e, key) => {
                                return(
                                  <button onClick={()=> {sendDataToParent(e.dial_code, type); setOpenMenu(false)}} key={key} aria-label={e.name}><span>{e.dial_code}</span> <Image src={`https://flagcdn.com/48x36/${e.code.toLowerCase()}.png`} loading='lazy' width={30} height={20} alt={e.name} title={e.name} /></button>
                                )
                              })
                            }
                          
                          </>
                        }
                    </div>
                }

        </div>
    )
}


export default InputDropMenu;