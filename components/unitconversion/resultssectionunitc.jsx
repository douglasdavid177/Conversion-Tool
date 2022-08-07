import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "../../styles/mainsection.module.css";

const ResultsSection = (props) => {
  return (
    <motion.div className={`${styles.resultsSection} ${styles.mainSection}`}>
      <h4>This is the results screen. This section is in development.</h4>
    </motion.div>
  );
};

export default ResultsSection;
