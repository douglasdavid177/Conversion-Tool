import { useState } from "react";
import styles from "../styles/Home.module.css";

const ResultsSection = ({
  decVal,
  denVal,
  resultsVal,
  resultsSndVal,
  decimalPlaces,
}) => {
  let firstStyle = resultsVal / denVal > decVal ? styles.higher : styles.lower;
  firstStyle = resultsVal / denVal == decVal ? styles.correct : firstStyle;
  let secondStyle =
    resultsSndVal / denVal > decVal ? styles.higher : styles.lower;
  return (
    <div className={styles.resultsSection}>
      <h2>Results</h2>
      <h1>
        {resultsVal}/{denVal}
      </h1>
      <h3>
        is the closest fraction to the desired decimal. It&apos;s decimal value
        is{" "}
        <span className={firstStyle}>
          {(resultsVal / denVal).toFixed(decimalPlaces)}{" "}
        </span>
        while the desired value was{" "}
        <span className={styles.correct}>
          {parseFloat(decVal).toFixed(decimalPlaces)}
        </span>
        .{" "}
        <span className={secondStyle}>
          {resultsSndVal}/{denVal}
        </span>{" "}
        was the second closest, with a decimal value of{" "}
        <span className={secondStyle}>
          {(resultsSndVal / denVal).toFixed(decimalPlaces)}
        </span>
        .
      </h3>
    </div>
  );
};

export default ResultsSection;
