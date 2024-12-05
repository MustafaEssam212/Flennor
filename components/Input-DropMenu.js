import { useState, useRef, useEffect } from 'react';
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import CountryList from 'country-list-with-dial-code-and-flag';
import { useTranslation } from 'next-i18next';

const InputDropMenu = ({ defaultValue, type, sendDataToParent }) => {
    const { t } = useTranslation('common');
    const [openMenu, setOpenMenu] = useState(false);
    const [menuTop, setMenuTop] = useState(0);
    const countries = CountryList.getAll();
    const sortedCountries = countries.sort((a, b) => a.data.name.localeCompare(b.data.name));
    const mainValueRef = useRef();
    const optionsRef = useRef();
    const [searchCountry, setSearchCountry] = useState('');
    
    // Filter countries based on search input
    const filteredCountries = searchCountry
        ? sortedCountries.filter((country) =>
            country.name.toLowerCase().includes(searchCountry.toLowerCase())
          )
        : sortedCountries;

    useEffect(() => {
        if (mainValueRef.current) {
            setMenuTop(mainValueRef.current.offsetHeight);
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
        if (type === 'regular') {
            if (defaultValue === 'MR.' || defaultValue === 'السّيد' || defaultValue === 'HERR.') {
                return t('contact.body.content.form.dropmenu.mr');
            } else {
                return t('contact.body.content.form.dropmenu.mrs');
            }
        } else {
            return defaultValue || t('contact.body.content.form.dropmenu.code');
        }
    };

    return (
        <div className="input-dropmenu-container">
            <div ref={mainValueRef} onClick={() => setOpenMenu(!openMenu)} className="main-dropmenu-value">
                <p>{getDefaultValue()}</p>
                {openMenu ? <IoMdArrowDropup className="icon" /> : <IoMdArrowDropdown className="icon" />}
            </div>

            {openMenu && (
                <div ref={optionsRef} style={{ top: `${menuTop}px` }} className="dropmenu-options">
                    {type === 'regular' ? (
                        <>
                            <button aria-label="MR." onClick={() => { sendDataToParent('MR.', type); setOpenMenu(false); }}>
                                {t('contact.body.content.form.dropmenu.mr')}
                            </button>
                            <button aria-label="MRS." onClick={() => { sendDataToParent('MRS.', type); setOpenMenu(false); }}>
                                {t('contact.body.content.form.dropmenu.mrs')}
                            </button>
                        </>
                    ) : (
                        <>
                            <input
                                value={searchCountry}
                                onChange={(e) => setSearchCountry(e.target.value)}
                                placeholder="Search"
                                aria-label="Search Country"
                            />
                            {filteredCountries.map((country, key) => (
                                <button
                                    key={key}
                                    onClick={() => { sendDataToParent(country.dial_code, type); setOpenMenu(false); }}
                                    aria-label={country.name}
                                >
                                    <span>{country.dial_code}</span> <span>{country.name}</span>
                                </button>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default InputDropMenu;
