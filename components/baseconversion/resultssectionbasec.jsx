import { useEffect, useRef, useState } from "react";
import styles from "../../styles/mainsection.module.css";

const ResultsSection = ({
  startB,
  endB,
  startStr,
  result,
  decimalPlaces,
  addCommas,
}) => {
  const resultsSndVal = -1;

  const startBStyle = startB > endB ? styles.higher : styles.lower;
  const endBStyle = endB > startB ? styles.higher : styles.lower;
  const sameBase = startB == endB;

  return (
    <div className={`${styles.resultsSection} ${styles.mainSection}`}>
      <h3>Result:</h3>
      <h1>
        {result} (base {endB})
      </h1>
      <h3 className={styles.description}>
        The value <span className={styles.correct}>{startStr}</span>(
        <span className={sameBase ? styles.correct : startBStyle}>
          base {startB}
        </span>
        ) is equivalent to the value{" "}
        <span className={styles.correct}>{result}</span>(
        <span className={sameBase ? styles.correct : endBStyle}>
          base {endB}
        </span>
        ).
      </h3>
    </div>
  );
};

export default ResultsSection;
