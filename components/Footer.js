import Image from "next/image";
import FlennorPartsWhiteLogo from '../public/flennor-parts-white-logo.png';
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";  
import { useTranslation } from 'next-i18next';


const Footer = () => {

    const { t } = useTranslation('common');

    return(
        <footer className="footer-container">
            <div className="top-footer">
                <div className="left-top-footer">
                    <div className="logo-img-container">
                        <Image src={FlennorPartsWhiteLogo} fill alt="Flennor Parts Logo" title="Flennor Parts Logo" />
                    </div>
                    <h2>{t('footer.topFooter.left.description')}</h2>
                    <div className="social-links">
                        <h2>{t('footer.topFooter.left.socialHeadline')}</h2>
                        <div className="social-containers">
                            <Link href="#" aria-label="Flennor Parts Facebook" title="Flennor Parts Facebook"><FaFacebookF className="icon" /></Link>
                            <Link href="#" aria-label="Flennor Parts Twitter" title="Flennor Parts Twitter"><FaTwitter className="icon" /></Link>
                            <Link href="#" aria-label="Flennor Parts Instagram" title="Flennor Parts Instagram"><FaInstagram className="icon" /></Link>
                            <Link href="#" aria-label="Flennor Parts Youtube" title="Flennor Parts Youtube"><FaYoutube className="icon" /></Link>
                        </div>
                    </div>
                </div>

                <div className="middle-top-footer">
                    <h1>{t('footer.topFooter.middle.headline')}</h1>
                    
                    <div className="links-container">
                        <Link href={`/`} aria-label="Flennor Parts homepage">{t('footer.topFooter.middle.links.linkOne')}</Link>
                        <Link href={`/about`} aria-label="Flennor Parts about us page">{t('footer.topFooter.middle.links.linkTwo')}</Link>
                        <Link href={`/contact`} aria-label="Flennor Parts contact us page">{t('footer.topFooter.middle.links.linkThree')}</Link>
                        <Link href={`/products`} aria-label="Flennor Parts products page">{t('footer.topFooter.middle.links.linkFour')}</Link>
                    </div>
                </div>

                <div className="right-top-footer">
                    <h1>{t('footer.topFooter.right.headline')}</h1>

                    <div className="info-container">
                        <h2><IoLocationOutline className="icon" />{t('footer.topFooter.right.info.addressOne')}</h2>
                        <h2><IoLocationOutline className="icon" />{t('footer.topFooter.right.info.addressTwo')}</h2>
                        <h2><IoLocationOutline className="icon" />{t('footer.topFooter.right.info.addressThree')}</h2>
                        <h2><IoLocationOutline className="icon" />{t('footer.topFooter.right.info.addressFour')}</h2>
                        <h2><MdOutlineMailOutline className="icon" /> sales@flennor-parts.com</h2>
                        <h2><FiPhone className="icon" /> +1 514-571-4054</h2>
                    </div>
                </div>
            </div>
            <div className="bottom-footer">
                <h2>© {t('footer.bottomFooter.headline')}</h2>
            </div>
        </footer>
    )
}


export default Footer;