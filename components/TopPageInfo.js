import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useTranslation } from 'next-i18next';

const TopPageInfo = () => {
    const { t } = useTranslation('common');

    return(
        <div className="top-page-info-container">


            <div className="left-top-info-container">
                <p><FaLocationDot className="icon" /> {t('topInfo.addressOne')}</p>
                <p><FaLocationDot className="icon" /> {t('topInfo.addressTwo')}</p>
                <p><FaLocationDot className="icon" /> {t('topInfo.addressThree')}</p>
                <p><FaLocationDot className="icon" /> {t('topInfo.addressFour')}</p>
                <p><FaLocationDot className="icon" /> {t('topInfo.addressFive')}</p>
            </div>
            
            <div className="right-top-info-container">
                <p>{t('topInfo.firstPhone')} <FaPhone className="icon phone-icon" /></p>
            </div>





        </div>
    )
}


export default TopPageInfo;