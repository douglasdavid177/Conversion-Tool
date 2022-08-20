import convert from "convert-units";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import InputSection from "./inputsectionunitc";
import ResultsSection from "./resultssectionunitc";
import styles from "../../styles/mainsection.module.css";

const UnitConversionSection = (props) => {
  const [startUnit, setStartUnit] = useState("default");
  const [endUnit, setEndUnit] = useState("default");
  const [endUnitAuto, setEndUnitAuto] = useState(false);
  const [startNumVal, setStartNumVal] = useState(NaN);
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [resultsVal, setResultsVal] = useState(-1);
  const [triggerWarning, setTriggerWarning] = useState(false);
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
    <motion.div ref={mainSectionRef}>
      <span className={styles.mainSectionLabelIntro}>
        <h5>Selected tool: </h5>
      </span>

      <span className={styles.mainSectionLabel}>
        <h4>Unit Conversion for Measurements</h4>
      </span>

      <div ref={subSectionRef}> </div>
      <AnimatePresence
        exitBeforeEnter
        onExitComplete={() => {
          const target = props.showResults ? subSectionRef : mainSectionRef;
          setTimeout(() => {
            props.smoothScrollTo(target);
          }, 450);
        }}
      >
        <motion.div
          key={props.showResults ? "results" : "input"}
          initial={{ translateY: 20, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: -20, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {props.showResults ? (
            <ResultsSection
              startNum={startNumVal}
              startU={startUnit}
              endU={endUnit}
              decPlaces={decimalPlaces}
              result={resultsVal}
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
    </motion.div>
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
