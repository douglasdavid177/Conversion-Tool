import convert from "convert-units";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import InputSection from "./inputsectionunitc";
import ResultsSection from "./resultssectionunitc";
import styles from "../../styles/mainsection.module.css";

const UnitConversionSection = (props) => {
  const [startUnit, setStartUnit] = useState("default");
  const [endUnit, setEndUnit] = useState("default");
  const [endUnitAuto, setEndUnitAuto] = useState(false); // True if 'auto' is selected for end unit , false othereise
  const [startNumVal, setStartNumVal] = useState(NaN);
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [resultsVal, setResultsVal] = useState(-1); // The converted value
  const [triggerWarning, setTriggerWarning] = useState(false); // Controls animation of instructions heading
  const mainSectionRef = useRef(null);
  const subSectionRef = useRef(null);

  useEffect(() => {
    if (props.attemptCalculate) {
      let num = startNumVal;
      let start = startUnit;
      let end = endUnit;

      if (start == "default" || end == "default" || isNaN(num)) {
        setTriggerWarning(true);
        props.setAttemptCalculate(false);
        props.setShowResults(false);
        // Scroll to red instructions
        if (subSectionRef.current) {
          props.smoothScrollTo(subSectionRef);
        }
        return;
      }
      calculate(num, start, end);
    }
  }, [props.attemptCalculate]);

  useEffect(() => {
    if (!props.showResults) {
      if (endUnitAuto) {
        setEndUnit("auto");
        setEndUnitAuto(false);
      }
    }
  }, [props.showResults]);

  return (
    <div ref={mainSectionRef}>
      {/*This is where app scrolls to when switching from results to input*/}

      <div>
        <span className={styles.mainSectionLabelIntro}>
          <h5>Selected tool: </h5>
        </span>

        <span className={styles.mainSectionLabel}>
          <h4>Unit Conversion for Measurements</h4>
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
              props.setDummyVar(!props.dummyVar);
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
                startNum={startNumVal}
                startU={startUnit}
                endU={endUnit}
                decPlaces={decimalPlaces}
                result={resultsVal}
                addCommas={props.addCommas}
              />
            ) : (
              <InputSection
                startNum={startNumVal}
                startU={startUnit}
                endU={endUnit}
                setStartNumFunc={setStartNumVal}
                setStartUFunc={setStartUnit}
                setEndUFunc={setEndUnit}
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
  function calculate(val, startU, endU) {
    let resultV;
    if (endUnit == "auto") {
      const resultObj = convert(val).from(startU).toBest();
      endU = resultObj.unit;
      resultV = resultObj.val;
      setEndUnit(endU);
      setEndUnitAuto(true);
    } else {
      resultV = convert(val).from(startU).to(endU);
    }

    setResultsVal(resultV);
    console.log("attempted actual conversion: ");
    console.log(resultV);
    props.setShowResults(true);
  }
};
export default UnitConversionSection;
