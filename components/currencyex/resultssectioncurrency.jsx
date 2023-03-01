import { useEffect, useRef, useState } from "react";
import styles from "../../styles/mainsection.module.css";

const ResultsSection = ({
  fromC,
  toC,
  startStr,
  result,
  decimalPlaces,
  addCommas,
  currencyObject,
}) => {
  const fromCStyle = fromC > toC ? styles.higher : styles.lower;
  const toCStyle = toC > fromC ? styles.higher : styles.lower;
  const sameBase = fromC == toC;

  return (
    <div className={`${styles.resultsSection} ${styles.mainSection}`}>
      <h3>Result:</h3>
      <h1>
        {result} {toC}
      </h1>
      <h3 className={styles.description}>
        The value <span className={styles.correct}>{startStr}</span>
        {fromC} (
        <span className={sameBase ? styles.correct : fromCStyle}>
          United States Dollar
        </span>
        ) is equivalent to the value{" "}
        <span className={styles.correct}>{result}</span>
        {toC} (
        <span className={sameBase ? styles.correct : toCStyle}>
          United States Dollar
        </span>
        ).
      </h3>
    </div>
  );
};

export default ResultsSection;
