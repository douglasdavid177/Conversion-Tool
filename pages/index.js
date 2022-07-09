import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import InputSectionDecToFrac from "../components/inputsectionfrac";
import ResultsSection from "../components/resultssection";

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [inputVal1, setinputVal1] = useState("");
  const [inputVal2, setinputVal2] = useState("");
  const [resultsVal, setResultsVal] = useState(-1);
  const [resultsSndVal, setResultsSndVal] = useState(5);
  const [triggerWarning, setTriggerWarning] = useState(false);
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [useFixedLayout, setUseFixedLayout] = useState(false); // Not happy with how this turned out so it's not in use
  const compRef = useRef();

  useEffect(() => {
    //fixHeight();
  }, []);
  function fixHeight() {
    const winheight = window.innerHeight;
    const compHeight = compRef.current.clientHeight;
    console.log("comp height: ");
    console.log(compHeight);
    console.log("win height: ");
    console.log(winheight);
    if (compHeight < winheight) {
      setUseFixedLayout(true);
    } else {
      setUseFixedLayout(false);
    }
  }
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
    <div
      className={`${styles.container} ${
        useFixedLayout ? styles.fixedLayout : {}
      }`}
      ref={compRef}
    >
      <AnimateSharedLayout>
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

          <motion.div
            key={showResults ? "results" : "input"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={styles.mainSectionHolder}
          >
            {showResults ? (
              <ResultsSection
                decVal={inputVal1}
                denVal={inputVal2}
                resultsVal={resultsVal}
                resultsSndVal={resultsSndVal}
                decimalPlaces={decimalPlaces}
              />
            ) : (
              <InputSectionDecToFrac
                dec={inputVal1}
                den={inputVal2}
                setDecFunc={setinputVal1}
                setDenFunc={setinputVal2}
                triggerW={triggerWarning}
                setTriggerFunc={setTriggerWarning}
                setDecPlacesFunc={setDecimalPlaces}
              />
            )}
          </motion.div>

          <motion.div>
            <div
              className={`${styles.buttonHolder} ${
                useFixedLayout ? styles.fixedButton : {}
              }`}
            >
              <button
                onClick={() => {
                  showResults ? resetInput() : gotoResults();
                }}
                className={showResults ? styles.secondary : styles.primary}
              >
                {showResults ? "Change Input" : "View Results"}
              </button>
            </div>
          </motion.div>
        </div>
      </AnimateSharedLayout>
    </div>
  );

  function gotoResults() {
    //console.log(showResults);
    calculate(inputVal1, inputVal2);
  }
  function resetInput() {
    setShowResults(false);
    setResultsVal(-1);
  }
}
