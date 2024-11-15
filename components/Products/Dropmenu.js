import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DropMenu = () => {
  const [openDropMenu, setOpenDropMenu] = useState(false);

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
              <h4>Model</h4>
              <h4>Engine Type</h4>
              <h4>Engine No.</h4>
              <h4>Year</h4>
              <h4>Additional info</h4>
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
