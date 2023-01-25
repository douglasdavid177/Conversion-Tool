import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import convert from "convert-units";

import styles from "../../styles/mainsection.module.css";

const ResultsSection = ({
  startNum,
  startU,
  endU,
  decPlaces,
  result,
  addCommas,
}) => {
  let tempStartNum = startNum;
  tempStartNum = 1;
  let tempResult = convert(tempStartNum).from(startU).to(endU);

  const sameUnit = startU == endU;
  let startUStyle = tempResult > tempStartNum ? styles.higher : styles.lower;
  const endUStyle = tempResult < tempStartNum ? styles.higher : styles.lower;
  const startUnitWordDynamic =
    startNum == 1 ? getSingular(startU) : getPlural(startU);
  const endUnitWordDynamic = result == 1 ? getSingular(endU) : getPlural(endU);

  const startUPlural = getPlural(startU);
  const endUPlural = getPlural(endU);
  const startSystem = convert().describe(startU).system;
  const endSystem = convert().describe(endU).system;
  const sameSystem = startSystem == endSystem;

  const decPlacesInheading = startNum > result ? decPlaces + 2 : decPlaces;
  return (
    <div className={`${styles.resultsSection} ${styles.mainSection}`}>
      <h3>Result:</h3>
      <h1>
        {addCommas(+parseFloat(result).toFixed(decPlacesInheading))} {endU}
      </h1>
      <h3 className={styles.description}>
        <span className={styles.correct}>
          {addCommas(+parseFloat(startNum).toFixed(decPlaces))}
        </span>{" "}
        {startU} (
        <span className={sameUnit ? styles.correct : startUStyle}>
          {startUnitWordDynamic}
        </span>
        ) is equivalent to{" "}
        <span className={styles.correct}>{addCommas(result)}</span> {endU} (
        <span className={sameUnit ? styles.correct : endUStyle}>
          {endUnitWordDynamic}
        </span>
        ). These units measure {getMeasure(startU)}.{" "}
        {sameSystem
          ? `Both ${startUPlural.toLowerCase()} and ${endUPlural.toLowerCase()} belong to the ${startSystem} system.`
          : `${
              startUPlural.charAt(0).toUpperCase() +
              startUPlural.toLowerCase().slice(1)
            } belong to the
          ${startSystem} system, while ${endUPlural.toLowerCase()} belong to the ${endSystem} system.`}
      </h3>
    </div>
  );

  // The following two functions merely correct a bug in the api that incorrectly displays cm2 as Centimeters
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

  // This function gets the measure type of a unit, and then converts the result from a camelcase string
  // into a more presentable string of seperate lowercase words
  function getMeasure(unit) {
    let syst = convert()
      .describe(unit)
      .measure.replace(/([A-Z])/g, " $1")
      .toLowerCase();

    return syst;
  }
};

export default ResultsSection;
