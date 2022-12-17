import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../styles/homesection.module.css";

const HomeSection = ({ setOpenNav }) => {
  return (
    <div className={styles.container}>
      <br />
      <p>
        This app is a collection of small numerical mini-tools and calculators
        for various purposes. To use this app, start by selecting a mini-tool
        from the list of available options. {/* <br /> */}
        Have a splendid day! :D
      </p>
      <motion.h3
        key="choosetoollink"
        initial={{ translateY: 55, opacity: 0 }}
        animate={{
          translateY: 0,
          opacity: 1,
          transition: {
            duration: 0.6,
            delay: 0.4,
            ease: [0.1, 0.1, 0, 1],
          },
        }}
      >
        <button
          className={styles.chooseToolButton}
          onClick={() => {
            setOpenNav(true);
          }}
        >
          Select Mini-Tool
        </button>
      </motion.h3>
    </div>
  );
};
export default HomeSection;
