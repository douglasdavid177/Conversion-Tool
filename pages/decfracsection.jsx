import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import InputSection from "../components/dectofrac/inputsectionfrac";
import ResultsSection from "../components/dectofrac/resultssectionfrac";
import styles from "../styles/mainsection.module.css";

const DecToFracSection = (props) => {
  const [decVal, setDecVal] = useState(NaN);
  const [denVal, setDenVal] = useState(NaN);
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [resultsVal, setResultsVal] = useState(-1); // The numerator
  const [resultsSndVal, setResultsSndVal] = useState(-1); // The second closest numerator
  const [triggerWarning, setTriggerWarning] = useState(false); // Controls animation of instructions heading
  const mainSectionRef = useRef(null);
  const subSectionRef = useRef(null);

  useEffect(() => {
    if (props.attemptCalculate) {
      calculate(decVal, denVal);
    }
  }, [props.attemptCalculate]);

  return (
    <div ref={mainSectionRef}>
      {/*This is where app scrolls to when switching from results to input*/}

      <div>
        <span className={styles.mainSectionLabelIntro}>
          <h5>Selected tool: </h5>
        </span>

        <span className={styles.mainSectionLabel}>
          <h4>Decimal to Fraction Converter</h4>
        </span>
      </div>

      <div ref={subSectionRef}>
        {/*This is where the app scrolls to when switching from input to results*/}

        {/*This component represents multiple different divs (one at a time) based on the current key. They are the input and results screens*/}
        <AnimatePresence
          initial={false}
          exitBeforeEnter
          onExitComplete={() => {
            {
              /*Scroll back down to the part of the main section that we requested to view when pressing action button, 
              but wait until after any layout changes are done */
            }
            const target = props.actuallyShowResults
              ? subSectionRef
              : mainSectionRef;
            setTimeout(() => {
              props.smoothScrollTo(target);
            }, 420);
          }}
        >
          <motion.div
            key={props.actuallyShowResults ? "results" : "input"}
            initial={{ translateY: 30, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{
              translateY: -30,
              opacity: 0,
              transition: { duration: 0.35, delay: 0 },
            }}
            transition={{ duration: 0.35 }}
          >
            {props.actuallyShowResults ? (
              <ResultsSection
                dec={decVal}
                den={denVal}
                resultsVal={resultsVal}
                resultsSndVal={resultsSndVal}
                decimalPlaces={decimalPlaces}
                addCommas={props.addCommasToNumber}
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
      </div>
    </div>
  );

  function calculate(dec, den) {
    dec = Math.abs(dec);
    den = Math.abs(den);
    if (den == 0 || isNaN(dec) || isNaN(den)) {
      props.setAttemptCalculate(false);
      setTriggerWarning(true);
      props.setShowResults(false);
      // Scroll to red instructions
      if (subSectionRef.current) {
        props.smoothScrollTo(subSectionRef);
      }
      return;
    }
    const fractionsArray = new Array(den + 1);
    let n = 0;
    for (n = 0; n <= den; n++) {
      fractionsArray[n] = n / den;
    }
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
    props.setShowResults(true);
  }
};
export default DecToFracSection;
