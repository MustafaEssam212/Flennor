import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import YellowShape from '@/components/YellowShape';
import { ImLocation2 } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaEarthAmericas } from "react-icons/fa6";
import Link from 'next/link';
import { useState } from 'react';
import InputDropMenu from '@/components/Input-DropMenu';
import { FaRegUser, FaRegBuilding } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaLocationDot, FaRegMessage } from "react-icons/fa6";
import { MdOutlineLocalPhone } from "react-icons/md";
import { FaLink } from "react-icons/fa6";

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

const ContactUs = () => {
    const { t } = useTranslation('common');

    // Refs for useInView
    const headerRef = useRef(null);
    const contentHeaderRef = useRef(null);

    // useInView hooks
    const isHeaderInView = useInView(headerRef, { once: true });
    const isContentHeaderInView = useInView(contentHeaderRef, { once: true });

    const inputFileRef = useRef();

    const [data, setData] = useState({
        gender: 'MR.',
        dial_code: '',
        phone: '',
        firstName: '',
        familyName: '',
        email: '',
        companyName: '',
        companyAddress: '',
        subject: '',
        message: '',
        files: []
    });


    const getDataFromDropmenu = (dataOfDrop, type) => {
        if(type === 'regular'){
            setData({...data, gender: dataOfDrop})
        }else{
            setData({...data, dial_code: dataOfDrop})
        }
    }

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const handleSubmitEmail = async () => {
        if(!data.gender || !data.phone || !data.dial_code || !data.firstName || !data.familyName || !data.email || !data.companyName || !data.companyAddress){
            setError('fill');
        }else{
            const formData = new FormData();

            formData.append('gender', data.gender);
            formData.append('dial_code', data.dial_code);
            formData.append('phone', data.phone);
            formData.append('firstName', data.firstName);
            formData.append('familyName', data.familyName);
            formData.append('email', data.email);
            formData.append('companyName', data.companyName);
            formData.append('companyAddress', data.companyAddress);
            formData.append('subject', data.subject);
            formData.append('message', data.message);
            data.files.forEach((file) => {
                formData.append("file", file);
            });


            const res = await fetch(`/api/contact`, {
                method: 'POST',
                body: formData
            });

            const dataOfResponse = await res.json();

            if(res.status === 200){
                setSuccess(true);
                setError(null);
                setData({
                    gender: 'MR.',
                    dial_code: '',
                    phone: '',
                    firstName: '',
                    familyName: '',
                    email: '',
                    companyName: '',
                    companyAddress: '',
                    subject: '',
                    message: '',
                    files: []
                })
            }else{
                setError('error');
                setSuccess(false);
            }
        }
    }


    return (
        <div className="contact-us-page-container">

            {/* Header Animation */}
            <motion.div
                className='contact-us-header'
                ref={headerRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: isHeaderInView ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                <div className='background-container'>
                    <h1>{t('contact.header.backgroundWord')}</h1>
                </div>
                <div className='layer-on-header'>
                    <h2>{t('contact.header.firstHeadline')}</h2>
                    <h1>{t('contact.header.secondHeadline')}</h1>
                </div>
            </motion.div>

            <div className='contact-us-content'>

                {/* Content Header Animation */}
                <motion.div
                    className='contact-us-content-header'
                    ref={contentHeaderRef}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: isContentHeaderInView ? 0 : 50, opacity: isContentHeaderInView ? 1 : 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1><YellowShape classname={`svg-headline`} />{t('contact.body.header.headline')}<YellowShape classname={`svg-headline`} /></h1>
                    <h3>{t('contact.body.header.sub')}</h3>
                </motion.div>


                <div className='contact-content-container'>

                    <div className='left-contact-content-container'>

                        <div className='contact-country'>
                            <div className='left-country'>
                                <FaEarthAmericas className='icon' />
                            </div>

                            <div className='right-country'>
                                <h2>{t('contact.body.content.countries.germany')}</h2>
                                <h3><ImLocation2 className='icon' /> Adersstraße 29-31 · 40215 Dusseldorf - Germany</h3>
                                <h3><FaPhoneAlt className='icon' /> <Link target='_blank' href={`https://wa.me/905386528778`} title='Flennor Parts Contact On WhatsApp' aria-label="Flennor Parts Contact On WhatsApp">+90 538 652 8778</Link></h3>
                                <h3><MdEmail className='icon' /> sales@flennor-parts.com</h3>
                            </div>
                        </div>

                        <div className='contact-country'>
                            <div className='left-country'>
                                <FaEarthAmericas className='icon' />
                            </div>

                            <div className='right-country'>
                                <h2>{t('contact.body.content.countries.turkey')}</h2>
                                <h3><ImLocation2 className='icon' /> Esentepe Mah., 34870 Kartal – Istanbul – Turkey</h3>
                                <h3><FaPhoneAlt className='icon' /> <Link target='_blank' href={`https://wa.me/905386528778`} title='Flennor Parts Contact On WhatsApp' aria-label="Flennor Parts Contact On WhatsApp">+90 538 652 8778</Link></h3>
                                <h3><MdEmail className='icon' /> sales@flennor-parts.com</h3>
                            </div>
                        </div>

                        <div className='contact-country'>
                            <div className='left-country'>
                                <FaEarthAmericas className='icon' />
                            </div>

                            <div className='right-country'>
                                <h2>{t('contact.body.content.countries.canada')}</h2>
                                <h3><ImLocation2 className='icon' /> 11015 Cavendish Blvd suite 410 - Montreal - Quebec - Canada</h3>
                                <h3><FaPhoneAlt className='icon' /> <Link target='_blank' href={`https://wa.me/15145714054`} title='Flennor Parts Contact On WhatsApp' aria-label="Flennor Parts Contact On WhatsApp">+1 514 571 4054</Link></h3>
                                <h3><MdEmail className='icon' /> sales@flennor-parts.com</h3>
                            </div>
                        </div>

                        <div className='contact-country'>
                            <div className='left-country'>
                                <FaEarthAmericas className='icon' />
                            </div>

                            <div className='right-country'>
                                <h2>{t('contact.body.content.countries.uae')}</h2>
                                <h3><ImLocation2 className='icon' /> Mai Tower - 6th Floor - Al Nahda 1 - Dubai - United Arab Emirates</h3>
                                <h3><FaPhoneAlt className='icon' /> <Link target='_blank' href={`https://wa.me/971527334015`} title='Flennor Parts Contact On WhatsApp' aria-label="Flennor Parts Contact On WhatsApp">+971 52 733 4015</Link></h3>
                                <h3><MdEmail className='icon' /> sales@flennor-parts.com</h3>
                            </div>
                        </div>

                    </div>


                    <div className='right-contact-content-container'>
                        <div className='input-with-dropdown'>

                            <div className='dropdown-contact'>
                                <InputDropMenu sendDataToParent={getDataFromDropmenu} defaultValue={data.gender} type="regular" />
                            </div>

                            <div className='contact-input-container'>
                                <input value={data.firstName} aria-label='first name' placeholder={t('contact.body.content.form.firstName')} onChange={(s)=> setData({...data, firstName: s.target.value})} type='text'></input>
                                <FaRegUser className='icon' />
                            </div>

                        </div>

                        <div className='input-without-dropdown'>
                            <input value={data.familyName} aria-label='family name' placeholder={t('contact.body.content.form.familyName')} onChange={(s)=> setData({...data, familyName: s.target.value})} type='text'></input>
                            <FaRegUser className='icon' />
                        </div>

                        <div className='input-without-dropdown'>
                            <input value={data.email} aria-label='email' placeholder={t('contact.body.content.form.email')} onChange={(s)=> setData({...data, email: s.target.value})} type='email'></input>
                            <MdOutlineEmail className='icon' />
                        </div>

                        <div className='input-with-dropdown countries'>

                        <div className='dropdown-contact'>
                            <InputDropMenu sendDataToParent={getDataFromDropmenu} defaultValue={data.dial_code} type="countries" />
                        </div>

                        <div className='contact-input-container'>
                            <input value={data.phone} aria-label='Phone' placeholder={t('contact.body.content.form.phoneNumber')} onChange={(s)=> setData({...data, phone: s.target.value})} type='number'></input>
                            <MdOutlineLocalPhone className='icon' />
                        </div>

                        </div>

                        <div className='input-without-dropdown'>
                            <input value={data.companyName} aria-label='Company Name' placeholder={t('contact.body.content.form.companyName')} onChange={(s)=> setData({...data, companyName: s.target.value})} type='text'></input>
                            <FaRegBuilding className='icon' />
                        </div>

                        <div className='input-without-dropdown'>
                            <input value={data.companyAddress} aria-label='Company Address' placeholder={t('contact.body.content.form.companyAddress')} onChange={(s)=> setData({...data, companyAddress: s.target.value})} type='text'></input>
                            <FaLocationDot className='icon' />
                        </div>

                        <div className='input-without-dropdown'>
                            <input value={data.subject} aria-label='Subject' placeholder={t('contact.body.content.form.subject')} onChange={(s)=> setData({...data, subject: s.target.value})} type='text'></input>
                            <FaRegMessage className='icon' />
                        </div>

                        <div className='textarea-container'>
                            <textarea value={data.message} placeholder={t('contact.body.content.form.message')} onChange={(s)=> setData({...data, message: s.target.value})} aria-label='Message' />
                        </div>

                        <div className='attach-file'>
                            <input accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" ref={inputFileRef} type='file' multiple aria-label='Upload File' onChange={(s)=> setData({...data, files: [...data.files, s.target.files[0]]})} />
                            <button aria-label='Upload File' onClick={()=> inputFileRef.current.click()}><FaLink className='icon' /> {t('contact.body.content.form.files')} {`(${data.files.length})`}</button>
                        </div>

                        <div className='submit-button'>
                            <button onClick={handleSubmitEmail} aria-label='Submit'>{t('contact.body.content.form.submit')}</button>
                        </div>

                        <div className='response-message'>
                            {error && <> {error === 'fill' ? <h3 className='red'><span></span> {t('contact.body.content.response.alert')}</h3> : <h3 className='red'><span></span> {t('contact.body.content.response.error')}</h3>}  </>}
                            {success && <h3><span></span> {t('contact.body.content.response.success')}</h3>}
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
};

export default ContactUs;
