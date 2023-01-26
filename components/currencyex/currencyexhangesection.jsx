import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import InputSection from "./inputsectioncurrency";
import ResultsSection from "./resultssectioncurrency";
import styles from "../../styles/mainsection.module.css";

const CurrencyExchangeSection = (props) => {
  const [startValString, setStartValString] = useState("");
  const [fromCType, setFromCType] = useState(NaN);
  const [toCType, setToCType] = useState(NaN);
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [resultsVal, setResultsVal] = useState(-1); // The numerator
  const [triggerWarning, setTriggerWarning] = useState(false); // Controls animation of instructions heading
  const mainSectionRef = useRef(null);
  const subSectionRef = useRef(null);

  useEffect(() => {
    if (props.attemptCalculate) {
      calculate(startValString, fromCType, toCType);
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
          <h4>Currency Exchange</h4>
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
            const target = props.showResults ? subSectionRef : mainSectionRef;
            setTimeout(() => {
              props.smoothScrollTo(target);
            }, 420);
          }}
        >
          <motion.div
            key={props.showResults ? "results" : "input"}
            initial={{ translateY: 30, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: -30, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {props.showResults ? (
              <ResultsSection
                fromC={fromCType}
                toC={toCType}
                startStr={startValString}
                result={resultsVal}
                decimalPlaces={decimalPlaces}
                addCommas={props.addCommas}
              />
            ) : (
              <InputSection
                fromC={fromCType}
                toC={toCType}
                startStr={startValString}
                setStartStrFunc={setStartValString}
                setFromCFunc={setFromCType}
                setToCFunc={setToCType}
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

  function calculate(num, fromC, toC) {
    const val = Number(startValString);
    if (val == 0 || isNaN(val)) {
      props.setAttemptCalculate(false);
      setTriggerWarning(true);
      props.setShowResults(false);
      // Scroll to red instructions
      if (subSectionRef.current) {
        props.smoothScrollTo(subSectionRef);
      }
      return;
    }

    const finalResult = 0;
    setResultsVal(finalResult);
    //props.setShowResults(true);
  }
};
export default CurrencyExchangeSection;
