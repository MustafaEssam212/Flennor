import { useTranslation } from 'next-i18next';
import { FaEarthEurope, FaEarthAmericas, FaEarthAsia } from "react-icons/fa6";
import { ImLocation2 } from "react-icons/im";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from "react";

const TopPageInfo = () => {
  const { t } = useTranslation('common');
  const [activeSection, setActiveSection] = useState(null);

  const handleToggle = (sectionKey) => {
    setActiveSection((prev) => (prev === sectionKey ? null : sectionKey));
  };

  const variants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
  };

  return (
    <div className="top-page-info-container">
      {RenderLocationSection(
        `${t('topInfo.titleOne')}`,
        [
          {
            country: `${t('topInfo.addressOne')}`,
            address: 'Adersstraße 29-31 40215 Düsseldorf - Germany',
            phone: '+15145714054',
            phoneLink: 'https://wa.me/15145714054',
            email: 'sales@flennor-parts.com',
          },
          {
            country: `${t('topInfo.addressThree')}`,
            address: 'Esentepe Mah., 34870 Kartal – Istanbul – Turkey',
            phone: '+90 538 652 8778',
            phoneLink: 'https://wa.me/905386528778',
            email: 'sales@flennor-parts.com',
          },
        ],
        FaEarthEurope,
        activeSection,
        handleToggle,
        `${t('topInfo.titleOne')}`,
        variants
      )}

      {RenderLocationSection(
        `${t('topInfo.titleTwo')}`,
        [
          {
            country: `${t('topInfo.addressTwo')}`,
            address: '11015 Cavendish Blvd suite 410 - Montreal - Quebec - Canada',
            phone: '+1 514 571 4054',
            phoneLink: 'https://wa.me/15145714054',
            email: 'sales@flennor-parts.com',
          },
        ],
        FaEarthAmericas,
        activeSection,
        handleToggle,
        `${t('topInfo.titleTwo')}`,
        variants
      )}

      {RenderLocationSection(
        `${t('topInfo.titleThree')}`,
        [
          {
            country: `${t('topInfo.addressFour')}`,
            address: 'Mai Tower - 6th Floor - Al Nahda 1 - Dubai - United Arab Emirates',
            phone: '+971 52 733 4015',
            phoneLink: 'https://wa.me/971527334015',
            email: 'sales@flennor-parts.com',
          },
        ],
        FaEarthAsia,
        activeSection,
        handleToggle,
        `${t('topInfo.titleThree')}`,
        variants
      )}
    </div>
  );
};

function RenderLocationSection(
  title,
  countries,
  Icon,
  activeSection,
  handleToggle,
  sectionKey,
  variants
) {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleToggle(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleToggle]);

  return (
    <div className="location-div">
      <p
        className="main-parag-location"
        onClick={() => handleToggle(sectionKey)}
      >
        <Icon className="icon" /> {title}
      </p>
      <motion.div
        className="pop-location"
        ref={containerRef}
        initial="hidden"
        animate={activeSection === sectionKey ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 0.3 }}
      >
        {countries.map(({ country, address, phone, phoneLink, email }) => (
          <div className="country" key={country}>
            <div className="title">
              <h2>
                <Icon className="icon" /> {country}
              </h2>
            </div>
            <h3>
              <ImLocation2 className="icon" /> {address}
            </h3>
            <h3>
              <FaPhoneAlt className="icon" />
              <Link href={phoneLink} target="_blank" aria-label="Flennor WhatsApp Number" title="Flennor WhatsApp Number">
                {phone}
              </Link>
            </h3>
            <h3>
              <MdEmail className="icon" /> {email}
            </h3>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default TopPageInfo;
