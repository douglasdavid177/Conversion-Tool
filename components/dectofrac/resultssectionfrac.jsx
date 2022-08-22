import { useEffect, useRef, useState } from "react";
import styles from "../../styles/mainsection.module.css";

const ResultsSection = ({
  dec,
  den,
  resultsVal,
  resultsSndVal,
  decimalPlaces,
  addCommas,
}) => {
  let firstStyle = resultsVal / den > dec ? styles.higher : styles.lower;
  firstStyle = resultsVal / den == dec ? styles.correct : firstStyle;
  const secondStyle = resultsSndVal / den > dec ? styles.higher : styles.lower;

  return (
    <div className={`${styles.resultsSection} ${styles.mainSection}`}>
      <h3>Result:</h3>
      <h1>
        {addCommas(resultsVal)} / {addCommas(den)}
      </h1>
      <h3 className={styles.description}>
        The closest fraction to the desired decimal is
        <span className={firstStyle}>
          {" "}
          {addCommas(resultsVal)}/{addCommas(den)}
        </span>
        {". "}
        It&apos;s decimal value is{" "}
        <span className={firstStyle}>
          {(resultsVal / den).toFixed(decimalPlaces)}
        </span>
        , while the desired value was{" "}
        <span className={styles.correct}>
          {parseFloat(dec).toFixed(decimalPlaces)}
        </span>
        . The second closest fraction was{" "}
        <span className={secondStyle}>
          {addCommas(resultsSndVal)}/{addCommas(den)}
        </span>{" "}
        with a decimal value of{" "}
        <span className={secondStyle}>
          {(resultsSndVal / den).toFixed(decimalPlaces)}
        </span>
        .
      </h3>
    </div>
  );
};

export default ResultsSection;
