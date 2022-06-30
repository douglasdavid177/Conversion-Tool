import { useState } from "react";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";
import InputSection from "../components/inputsection";

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [decVal, setDecVal] = useState("");
  const [denVal, setDenVal] = useState("");
  const [resultsVal, setResultsVal] = useState(-1);
  const [resultsSndVal, setResultsSndVal] = useState(5);
  const [triggerWarning, setTriggerWarning] = useState(false);
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
            src="/buildingsvgturquoise.svg"
            alt="An SVG of a construction worker checking a clipboard"
            className={styles.heroimg}
          />
          <h4>Welcome to...</h4>
          <h1>...Lucas&apos;s Conversion Tool!</h1>
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
              <ResultsSection />
            ) : (
              <InputSection
                dec={decVal}
                den={denVal}
                setDecFunc={setDecVal}
                setDenFunc={setDenVal}
                triggerW={triggerWarning}
                setTriggerFunc={setTriggerWarning}
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

  // function InputSection() {
  //   return (
  //     <div className={styles.inputSection}>
  //       <h5
  //         className={triggerWarning ? styles.warning : {}}
  //         onAnimationEnd={() => {
  //           console.log("yayy");
  //           setTriggerWarning(false);
  //         }}
  //       >
  //         Please enter the decimal you want converted, and the denominator of
  //         the fraction you want it converted to.
  //       </h5>
  //       <form className={styles.inputFields} key="myform">
  //         <label>
  //           <h3>Decimal value</h3>

  //           <input
  //             // type="text"
  //             // key="dec"
  //             // name="dec"
  //             type="text"
  //             //pattern="\d*"
  //             value={decVal.toString()}
  //             inputMode="decimal"
  //             onChange={handleInputDec}
  //           />
  //         </label>
  //         <label>
  //           <h3>Fraction denominator</h3>
  //           <input
  //             key="den"
  //             name="den"
  //             // type="text"
  //             type="text"
  //             //pattern="\d*"
  //             inputMode="decimal"
  //             value={denVal}
  //             onChange={(e) => {
  //               let result = e.target.value;
  //               console.log(result);
  //               result = Math.abs(result);
  //               result = parseInt(result);
  //               setDenVal(result);
  //             }}
  //           />
  //         </label>
  //       </form>
  //     </div>
  //   );
  // }

  function ResultsSection() {
    let firstStyle =
      resultsVal / denVal > decVal ? styles.higher : styles.lower;
    firstStyle = resultsVal / denVal == decVal ? styles.correct : firstStyle;
    let secondStyle =
      resultsSndVal / denVal > decVal ? styles.higher : styles.lower;
    return (
      <div>
        <h2>Results</h2>
        <h1>
          {resultsVal}/{denVal}
        </h1>
        <h3>
          is the closest fraction to the desired decimal. It&apos;s decimal
          value is{" "}
          <span className={firstStyle}>
            {(resultsVal / denVal).toFixed(2)}{" "}
          </span>
          while the desired value was{" "}
          <span className={styles.correct}>
            {parseFloat(decVal).toFixed(2)}
          </span>
          .{" "}
          <span className={secondStyle}>
            {resultsSndVal}/{denVal}
          </span>{" "}
          was the second closest, with a decimal value of{" "}
          <span className={secondStyle}>
            {(resultsSndVal / denVal).toFixed(2)}
          </span>
          .
        </h3>
      </div>
    );
  }
}
