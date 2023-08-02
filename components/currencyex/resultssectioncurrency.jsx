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
  decPlaces = currencyObject[toC]?.precision;
  //console.log(decPlaces);
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
        {addCommas(formattedResult)} {toC}
      </h1>
      <h3 className={styles.description}>
        The amount of{" "}
        <span className={styles.correct}>{addCommas(Number(startStr))} </span>
        {fromC} (
        <span className={sameBase ? styles.correct : fromCStyle}>
          {currencyObject[fromC].name}
        </span>
        ) is equivalent to the amount of{" "}
        <span className={styles.correct}>{addCommas(result)} </span>
        {toC} (
        <span className={sameBase ? styles.correct : toCStyle}>
          {currencyObject[toC].name}
        </span>
        ).
      </h3>
    </div>
  );
};

export default ResultsSection;
