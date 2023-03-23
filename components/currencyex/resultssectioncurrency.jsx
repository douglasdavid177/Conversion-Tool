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
  currencyRatesObj,
}) => {
  let decPlaces = -1;
  decPlaces = currencyObject[toC]?.decimal_units;
  let formattedResult = result.toFixed(
    // If decplaces is undefined, use same amount of decimals as input
    decPlaces == -1 ? decimalPlaces : decPlaces
  );

  const fromCStyle =
    currencyRatesObj[fromC] < currencyRatesObj[toC]
      ? styles.higher
      : styles.lower;
  const toCStyle =
    currencyRatesObj[toC] < currencyRatesObj[fromC]
      ? styles.higher
      : styles.lower;
  const sameBase = currencyRatesObj[fromC] == currencyRatesObj[toC];

  return (
    <div className={`${styles.resultsSection} ${styles.mainSection}`}>
      <h3>Result:</h3>
      <h1>
        {formattedResult} {toC}
      </h1>
      <h3 className={styles.description}>
        The amount of <span className={styles.correct}>{startStr} </span>
        {fromC} (
        <span className={sameBase ? styles.correct : fromCStyle}>
          {currencyObject[fromC].currency_name}
        </span>
        ) is equivalent to the amount of{" "}
        <span className={styles.correct}>{result} </span>
        {toC} (
        <span className={sameBase ? styles.correct : toCStyle}>
          {currencyObject[toC].currency_name}
        </span>
        ).
      </h3>
    </div>
  );
};

export default ResultsSection;
