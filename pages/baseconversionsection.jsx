import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import InputSection from "../components/baseconversion/inputsectionbasec";
import ResultsSection from "../components/baseconversion/resultssectionbasec";
import styles from "../styles/mainsection.module.css";

const BaseConversionSection = (props) => {
  const [startValString, setStartValString] = useState("");
  const [startBase, setstartBase] = useState(NaN);
  const [endBase, setendBase] = useState(NaN);
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [resultsVal, setResultsVal] = useState(-1); // The numerator
  const [triggerWarning, setTriggerWarning] = useState(false); // Controls animation of instructions heading
  const mainSectionRef = useRef(null);
  const subSectionRef = useRef(null);

  useEffect(() => {
    if (props.attemptCalculate) {
      calculate(startValString, startBase, endBase);
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
          <h4>Number Base Conversion</h4>
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
                startB={startBase}
                endB={endBase}
                startStr={startValString}
                result={resultsVal}
                decimalPlaces={decimalPlaces}
                addCommas={props.addCommasToNumber}
              />
            ) : (
              <InputSection
                startB={startBase}
                endB={endBase}
                startStr={startValString}
                setStartStrFunc={setStartValString}
                setStartBFunc={setstartBase}
                setEndBFunc={setendBase}
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

  function calculate(num, startB, endB) {
    if (
      startB == 0 ||
      startB == 1 ||
      isNaN(startB) ||
      endB == 0 ||
      endB == 1 ||
      isNaN(endB)
    ) {
      props.setAttemptCalculate(false);
      setTriggerWarning(true);
      props.setShowResults(false);
      // Scroll to red instructions
      if (subSectionRef.current) {
        props.smoothScrollTo(subSectionRef);
      }
      return;
    }

    const decResult = parseInt(num, startB);
    if (isNaN(decResult)) {
      props.setAttemptCalculate(false);
      setTriggerWarning(true);
      props.setShowResults(false);
      // Scroll to red instructions
      if (subSectionRef.current) {
        props.smoothScrollTo(subSectionRef);
      }
      return;
    }
    setStartValString(decResult.toString(startB).toUpperCase());
    const finalResult = decResult.toString(endB).toUpperCase();
    console.log("decR: " + decResult + ", finR: " + finalResult);
    setResultsVal(finalResult);

    props.setShowResults(true);
  }
};
export default BaseConversionSection;
