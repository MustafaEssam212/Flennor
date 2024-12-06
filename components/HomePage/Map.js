import {useState} from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaLocationDot } from "react-icons/fa6";
import MapImg from "../../public/map.png";
import { useTranslation } from "next-i18next";
import MapPop from "./Map-Pop";

const Map = () => {
  const { t } = useTranslation("common");
  const [activePop, setActivePop] = useState(null); // Track active popover

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Jump and rotate animation
  const jumpRotateAnimation = {
    animate: {
      y: [0, -10, 0], // Jump effect
    },
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const handlePopToggle = (location) => {
    setActivePop((prev) => (prev === location ? null : location));
  };


 

  return (
    <div className="map-homepage-container">
      <div className="inner-map-homepage-container">
        <motion.div
          className="map-homepage-header"
          initial="hidden"
          whileInView="visible"
          variants={headerVariants}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: false }}
        >
          <h1>{t("homepage.map.title")}</h1>
          <h3>{t("homepage.map.subTitle")}</h3>
        </motion.div>
        <div className="map-img">
          <Image
            src={MapImg}
            fill
            alt="Flennor Parts Spread Map"
            title="Flennor Parts Spread Map"
            sizes="(min-width: 580px) 75vw, 100vw"
            loading="lazy"
          />
          {/* Location marks with jump and rotate animation */}
          {["CANADA", "TURKEY", "GERMANY", "UAE"].map((location) => (
            <motion.div
              key={location}
              className={`location-mark ${location.toLowerCase()}`}
              {...jumpRotateAnimation}
              onClick={() => handlePopToggle(location)}
            >
              <FaLocationDot title={location} className="icon" />
              {activePop === location && <MapPop handlePopToggle={handlePopToggle} data={location} />}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Map;
