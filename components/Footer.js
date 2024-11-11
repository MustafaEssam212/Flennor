import Image from "next/image";
import FlennorPartsWhiteLogo from '../public/flennor-parts-white-logo.png';
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";

const Footer = () => {
    return(
        <footer className="footer-container">
            <div className="top-footer">
                <div className="left-top-footer">
                    <div className="logo-img-container">
                        <Image src={FlennorPartsWhiteLogo} fill alt="Flennor Parts Logo" title="Flennor Parts Logo" />
                    </div>
                    <h2>Flennor Parts offers a wide range of premium automotive spare parts, ensuring quality and durability. From belts and filters to brake systems and more, we provide reliable solutions for all your vehicle maintenance needs.</h2>
                    <div className="social-links">
                        <h2>Follow Us</h2>
                        <div className="social-containers">
                            <Link href="#" aria-label="Flennor Parts Facebook" title="Flennor Parts Facebook"><FaFacebookF className="icon" /></Link>
                            <Link href="#" aria-label="Flennor Parts Twitter" title="Flennor Parts Twitter"><FaTwitter className="icon" /></Link>
                            <Link href="#" aria-label="Flennor Parts Instagram" title="Flennor Parts Instagram"><FaInstagram className="icon" /></Link>
                            <Link href="#" aria-label="Flennor Parts Youtube" title="Flennor Parts Youtube"><FaYoutube className="icon" /></Link>
                        </div>
                    </div>
                </div>

                <div className="middle-top-footer">
                    <h1>Useful</h1>
                    
                    <div className="links-container">
                        <Link href={`/`} aria-label="Flennor Parts homepage">Homepage</Link>
                        <Link href={`/about`} aria-label="Flennor Parts about us page">About Us</Link>
                        <Link href={`/contact`} aria-label="Flennor Parts contact us page">Contact Us</Link>
                        <Link href={`/contact`} aria-label="Flennor Parts products page">Products</Link>
                    </div>
                </div>

                <div className="right-top-footer">
                    <h1>Contact Us</h1>

                    <div className="info-container">
                        <h2><IoLocationOutline className="icon" /> Adersstraße 29-31 · 40215 Dusseldorf - Germany</h2>
                        <h2><IoLocationOutline className="icon" /> Mai Tower - 6th Floor - Al Nahda 1 - Dubai - United Arab Emirates</h2>
                        <h2><IoLocationOutline className="icon" /> Esentepe Mah., 34870 Kartal - Istanbul - Turkiye</h2>
                        <h2><IoLocationOutline className="icon" /> 11015 Cavendish Blvd suit 410 - Monteral - Quebec - Canada</h2>
                        <h2><MdOutlineMailOutline className="icon" /> sales@flennor-parts.com</h2>
                        <h2><FiPhone className="icon" /> +1 514-571-4054</h2>
                    </div>
                </div>
            </div>
            <div className="bottom-footer">
                <h2>© All copyright saved to Flennor-Parts</h2>
            </div>
        </footer>
    )
}


export default Footer;