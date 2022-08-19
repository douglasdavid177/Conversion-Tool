import { useState } from "react";
import styles from "../../styles/mainsection.module.css";

const ResultsSection = ({
  dec,
  den,
  resultsVal,
  resultsSndVal,
  decimalPlaces,
}) => {
  let firstStyle = resultsVal / den > dec ? styles.higher : styles.lower;
  firstStyle = resultsVal / den == dec ? styles.correct : firstStyle;
  const secondStyle = resultsSndVal / den > dec ? styles.higher : styles.lower;
  return (
    <div className={`${styles.resultsSection} ${styles.mainSection}`}>
      <h3>Result:</h3>
      <h1>
        {resultsVal}/{den}
      </h1>
      <h3 className={styles.description}>
        is the closest fraction to the desired decimal. It&apos;s decimal value
        is{" "}
        <span className={firstStyle}>
          {(resultsVal / den).toFixed(decimalPlaces)}{" "}
        </span>
        while the desired value was{" "}
        <span className={styles.correct}>
          {parseFloat(dec).toFixed(decimalPlaces)}
        </span>
        .{" "}
        <span className={secondStyle}>
          {resultsSndVal}/{den}
        </span>{" "}
        was the second closest, with a decimal value of{" "}
        <span className={secondStyle}>
          {(resultsSndVal / den).toFixed(decimalPlaces)}
        </span>
        .
      </h3>
    </div>
  );
};

export default ResultsSection;
