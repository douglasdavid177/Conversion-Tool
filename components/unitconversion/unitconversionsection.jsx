import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import InputSection from "./inputsectionunitc";
import ResultsSection from "./resultssectionunitc";

const UnitConversionSection = (props) => {
  const [startUnit, setStartUnit] = useState(null);
  const [endUnit, setEndUnit] = useState(null);
  const [startNumVal, setStartNumVal] = useState("");
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [resultsVal, setResultsVal] = useState(-1);
  const [resultsSndVal, setResultsSndVal] = useState(-1);
  const [resultsThrdVal, setResultsThrdVal] = useState(-1);
  const [triggerWarning, setTriggerWarning] = useState(false);

  useEffect(
    () => () => {
      props.setAttemptCalculate(false);
      props.setShowResults(false);
    },
    []
  );

  useEffect(() => {
    if (props.attemptCalculate) {
      let num = 0;
      let start = 0;
      let end = 0;
      calculate(num, start, end);
    }
  }, [props.attemptCalculate]);

  const calculate = (val, startU, endU) => {
    props.setShowResults(true);
  };
  return (
    <motion.div>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={props.showResults ? "results" : "input"}
          initial={{ translateY: 20, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          exit={{ translateY: -20, opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {props.showResults ? (
            <ResultsSection />
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
};
export default UnitConversionSection;
