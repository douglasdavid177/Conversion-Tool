import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styles from "../styles/navpanel.module.css";

const NavPanel = ({ isOpen, setIsOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.background}
          key={"bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        ></motion.div>
      )}

      {isOpen && (
        <motion.div
          className={styles.panel}
          onClick={(e) => {
            e.stopPropagation();
          }}
          key={"panel"}
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.7, ease: [0, 1.14, 0.75, 0.98] }}
        >
          <ul>
            <li>
              <button>Item 1</button>
            </li>
            <li>
              <button>Item 1</button>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavPanel;
