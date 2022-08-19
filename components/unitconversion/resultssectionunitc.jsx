import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import convert from "convert-units";

import styles from "../../styles/mainsection.module.css";

const ResultsSection = ({ startNum, startU, endU, decPlaces, result }) => {
  const sameUnit = startU == endU;
  let startUStyle = result > startNum ? styles.higher : styles.lower;
  const endUStyle = result < startNum ? styles.higher : styles.lower;
  const startUnitWordDynamic =
    startNum == 1 ? getSingular(startU) : getPlural(startU);
  const endUnitWordDynamic = result == 1 ? getSingular(endU) : getPlural(endU);

  const startUPlural = getPlural(startU);
  const endUPlural = getPlural(endU);
  const startSystem = convert().describe(startU).system;
  const endSystem = convert().describe(endU).system;

  const sameSystem = startSystem == endSystem;
  return (
    <motion.div className={`${styles.resultsSection} ${styles.mainSection}`}>
      <h3>Result:</h3>
      <h1>
        {+parseFloat(result).toFixed(decPlaces + 3)} {endU}
      </h1>
      <h3 className={styles.description}>
        <span className={styles.correct}>
          {+parseFloat(startNum).toFixed(decPlaces)}
        </span>{" "}
        {startU} (
        <span className={sameUnit ? styles.correct : startUStyle}>
          {startUnitWordDynamic}
        </span>
        ) is equivalent to <span className={styles.correct}>{result}</span>{" "}
        {endU} (
        <span className={sameUnit ? styles.correct : endUStyle}>
          {endUnitWordDynamic}
        </span>
        ). These units measure {convert().describe(startU).measure}.{" "}
        {sameSystem
          ? `Both ${startUPlural.toLowerCase()} and ${endUPlural.toLowerCase()} belong to the ${startSystem} system.`
          : `${
              startUPlural.charAt(0).toUpperCase() +
              startUPlural.toLowerCase().slice(1)
            } belong to the
          ${startSystem} system while ${endUPlural.toLowerCase()} belong to the ${endSystem} system.`}
      </h3>
      {/* <h4>
        123.45 x (some units) is equivelant to 543.21 y (some other units).
        These units measure mass. some units are part of the imperical system
        while some other units are part of the metric system.
      </h4> */}
      {/* <h4>
        {`
        This app is a single page web application (SPA), written in JavaScript with the NextJS framework. It uses
        ReactJS for frontend architecture, controlling state management, data
        binding, events, application lifecycle and routing. CSS modules are used to apply styling, and animations were written using Framer Motion
        API. The app consists of various mathemaical tools including: `}
      </h4>
      <h4>{`A decimal to fraction converter, that finds a fraction of a given denominator that's closest to or equivent to a given decimal, `}</h4>
      <h4>{`A unit conversion tool (coming soon), for calculating equivelant measurements using different physical units,`}</h4>
      <h4>{`And a tip calculator (coming soon), which helps generate and display convenient tip values based on markers such as nearest percentage or nearest dollar.`}</h4> */}
      <br />
    </motion.div>
  );
  function getPlural(unit) {
    const plural = convert().describe(unit).plural;
    if (unit == "cm2") plural = "Square Centimeters";
    return plural;
  }
  function getSingular(unit) {
    const singular = convert().describe(unit).singular;
    if (unit == "cm2") singular = "Square Centimeter";
    return singular;
  }
};

export default ResultsSection;
