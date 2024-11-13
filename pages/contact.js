import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import PhoneImg from '../public/phone.png';
import LocationImg from '../public/location.png';
import EmailImg from '../public/email.png';
import YellowShape from '@/components/YellowShape';
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";  


export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const ContactUs = () => {
    return(
        <div className="contact-us-page-container">
            
            <div className='contact-us-header'>
                <div className='background-container'>
                    <h1>Contact Us</h1>
                </div>

                <div className='layer-on-header'>
                    <h2>Be In Touch With</h2>
                    <h1>Flennor</h1>
                </div>
            </div>


            <div className='contact-us-content'>
                
                <div className='contact-us-content-header'>
                    <h1><YellowShape classname={`svg-headline`} />Contact Us<YellowShape classname={`svg-headline`} /></h1>
                    <h3>Want to say something? We would love to hear from you.</h3>
                </div>

                <div className='contact-cards'>


                    <div className='contact-card'>
                        <div className='top-contact-card'>
                            <Image src={PhoneImg} width={120} height={120} alt='Flennor Parts Address' title='Flennor Parts Address' />
                        </div>
                        <div className='body-contact-card'>
                            <h3><FiPhone className='icon' /> +1 514-571-4054</h3>
                        </div>
                    </div>

                    <div className='contact-card'>
                        <div className='top-contact-card'>
                            <Image src={LocationImg} width={120} height={120} alt='Flennor Parts Address' title='Flennor Parts Address' />
                        </div>
                        <div className='body-contact-card'>
                            <h3><IoLocationOutline className='icon' /> Adersstraße 29-31 · 40215 Dusseldorf - Germany</h3>
                            <h3><IoLocationOutline className='icon' /> Mai Tower - 6th Floor - Al Nahda 1 - Dubai - United Arab Emirates</h3>
                            <h3><IoLocationOutline className='icon' /> Esentepe Mah., 34870 Kartal - Istanbul - Turkiye</h3>
                            <h3><IoLocationOutline className='icon' /> 11015 Cavendish Blvd suit 410 - Monteral - Quebec - Canada</h3>
                        </div>
                    </div>

                    <div className='contact-card'>
                        <div className='top-contact-card'>
                            <Image src={EmailImg} width={120} height={120} alt='Flennor Parts Address' title='Flennor Parts Address' />
                        </div>
                        <div className='body-contact-card'>
                            <h3><MdOutlineMailOutline className='icon' /> sales@flennor-parts.com</h3>
                        </div>
                    </div>
                </div>
             
                <div className='dark-card'>
                   
                </div>

            </div>

        </div>
    )
}


export default ContactUs;