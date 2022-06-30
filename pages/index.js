import { useState } from "react";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";
import InputSection from "../components/inputsection";
import ResultsSection from "../components/resultssection";

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [decVal, setDecVal] = useState("");
  const [denVal, setDenVal] = useState("");
  const [resultsVal, setResultsVal] = useState(-1);
  const [resultsSndVal, setResultsSndVal] = useState(5);
  const [triggerWarning, setTriggerWarning] = useState(false);
  const [decimalPlaces, setDecimalPlaces] = useState(2);

  const calculate = (dec, den) => {
    dec = Math.abs(dec);
    den = Math.abs(den);
    if (den == 0 || isNaN(dec) || isNaN(den)) {
      setTriggerWarning(true);
      return;
    }
    const fractionsArray = new Array(den + 1);
    let n = 0;
    for (n = 0; n <= den; n++) {
      fractionsArray[n] = n / den;
    }
    console.log("fractions: ");
    console.log(fractionsArray);
    const leftOverDec = dec - Math.floor(dec);
    const fractionsArrayCopy = [...fractionsArray];
    const fractionsArrayCopy2 = [...fractionsArray];

    const closest = fractionsArrayCopy.reduce(function (prev, curr) {
      return Math.abs(curr - leftOverDec) < Math.abs(prev - leftOverDec)
        ? curr
        : prev;
    });

    const closestIndex = fractionsArray.indexOf(closest);
    fractionsArrayCopy2.splice(closestIndex, 1);
    const secondClosest = fractionsArrayCopy2.reduce(function (prev, curr) {
      return Math.abs(curr - leftOverDec) < Math.abs(prev - leftOverDec)
        ? curr
        : prev;
    });
    const secondClosestIndex = fractionsArray.indexOf(secondClosest);
    setResultsVal(closestIndex);
    setResultsSndVal(secondClosestIndex);
    setShowResults(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <img
            src="/workersvg-turquoise.svg"
            alt="An SVG of a construction worker checking a clipboard"
            className={styles.heroimg}
          />
          <h5>Welcome to...</h5>
          {/* <h1>...Lucas&apos;s Conversion Tool!</h1> */}
          <h1>Lucas&apos;s Decimal to Fraction Converter Tool!</h1>
        </div>

        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={showResults ? "results" : "input"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {showResults ? (
              <ResultsSection
                decVal={decVal}
                denVal={denVal}
                resultsVal={resultsVal}
                resultsSndVal={resultsSndVal}
                decimalPlaces={decimalPlaces}
              />
            ) : (
              <InputSection
                dec={decVal}
                den={denVal}
                setDecFunc={setDecVal}
                setDenFunc={setDenVal}
                triggerW={triggerWarning}
                setTriggerFunc={setTriggerWarning}
                setDecPlacesFunc={setDecimalPlaces}
              />
            )}
          </motion.div>
        </AnimatePresence>
        <div className={styles.buttonHolder}>
          <button
            onClick={() => {
              showResults ? resetInput() : gotoResults();
            }}
          >
            {showResults ? "Change Input" : "View Results"}
          </button>
        </div>
      </div>
    </div>
  );

  function gotoResults() {
    //console.log(showResults);
    calculate(decVal, denVal);
  }
  function resetInput() {
    setShowResults(false);
    setResultsVal(-1);
  }
}
