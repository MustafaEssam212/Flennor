import { FaEarthAmericas } from "react-icons/fa6";
import { ImLocation2 } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { useTranslation } from 'next-i18next';
import { useRef, useState, useEffect } from "react";

const MapPop = ({data, handlePopToggle}) => {
    const { t } = useTranslation('common');

    const getData = {
        'CANADA': {
            country: t('topInfo.addressTwo'),
            location: '11015 Cavendish Blvd suite 410 - Montreal - Quebec - Canada',
            phoneText: '+1 514 571 4054',
            link: 'https://wa.me/15145714054'
        },
        'TURKEY': {
            country: t('topInfo.addressThree'),
            location: 'Esentepe Mah., 34870 Kartal – Istanbul – Turkey',
            phoneText: '+90 538 652 8778',
            link: 'https://wa.me/905386528778'
        },
        'GERMANY': {
            country: t('topInfo.addressOne'),
            location: 'Adersstraße 29-31 40215 Düsseldorf - Germany',
            phoneText: '+1 514 571 4054',
            link: 'https://wa.me/15145714054'
        },
        'UAE': {
            country: t('topInfo.addressFour'),
            location: 'Mai Tower - 6th Floor - Al Nahda 1 - Dubai - United Arab Emirates',
            phoneText: '+971 52 733 4015',
            link: 'https://wa.me/971527334015'
        }
    }


    const containerRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          handlePopToggle(null);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [handlePopToggle]);


    return(
        <div style={data === 'CANADA' ? {left: '0'} : {right: '0'}} ref={containerRef} className="map-pop-container">
            <div className="title">
                <h4><FaEarthAmericas className="icon" /> {getData[data].country}</h4> 
            </div>

            <h5><ImLocation2 className="icon" /> {getData[data].location}</h5>
            <h5><FaPhoneAlt className="icon" /> <Link target="_blank" href={getData[data].link} title="Flennor Parts Phone Number" aria-label="Flennor-Parts Phone Number">{getData[data].phoneText}</Link></h5>
            <h5><MdEmail className="icon" /> sales@flennor-parts.com</h5>
        </div>
    )
}


export default MapPop;