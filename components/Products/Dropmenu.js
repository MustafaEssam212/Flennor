import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from 'next-i18next';


const DropMenu = () => {
  const [openDropMenu, setOpenDropMenu] = useState(false);
  const { t } = useTranslation('common');


  return (
    <div className="dropdown" onClick={() => setOpenDropMenu(!openDropMenu)}>
      <div className="main-parag">
        <h2>TESLA</h2>
        {!openDropMenu ? <FaPlus className="icon" /> : <FaMinus className="icon" />}
      </div>

      {/* Animated dropmenu-body */}
      <AnimatePresence initial={false}>
        {openDropMenu && (
          <motion.div
            className="dropmenu-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="dropmenu-body-head">
              <h4>{t('products.popWindow.dropmenuHeader.model')}</h4>
              <h4>{t('products.popWindow.dropmenuHeader.engineType')}</h4>
              <h4>{t('products.popWindow.dropmenuHeader.engineNo')}</h4>
              <h4>{t('products.popWindow.dropmenuHeader.year')}</h4>
              <h4>{t('products.popWindow.dropmenuHeader.additionalInfo')}</h4>
            </div>

            <div className="dropmenu-body-result">
              <h4>MODEL 3</h4>
              <h4>A 0.0 EV</h4>
              <h4>3D1</h4>
              <h4>20---20---</h4>
              <h4>adad adasd wweasd asdasd asdasd</h4>
            </div>

            <div className="dropmenu-body-result">
              <h4>MODEL 3</h4>
              <h4>A 0.0 EV</h4>
              <h4>3D1</h4>
              <h4>20---20---</h4>
              <h4>adad adasd wweasd asdasd asdasd</h4>
            </div>

            <div className="dropmenu-body-result">
              <h4>MODEL 3</h4>
              <h4>A 0.0 EV</h4>
              <h4>3D1</h4>
              <h4>20---20---</h4>
              <h4>adad adasd wweasd asdasd asdasd</h4>
            </div>

            <div className="dropmenu-body-result">
              <h4>MODEL 3</h4>
              <h4>A 0.0 EV</h4>
              <h4>3D1</h4>
              <h4>20---20---</h4>
              <h4>adad adasd wweasd asdasd asdasd</h4>
            </div>

            <div className="dropmenu-body-result">
              <h4>MODEL 3</h4>
              <h4>A 0.0 EV</h4>
              <h4>3D1</h4>
              <h4>20---20---</h4>
              <h4>adad adasd wweasd asdasd asdasd</h4>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropMenu;
