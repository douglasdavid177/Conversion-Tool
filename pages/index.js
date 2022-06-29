import { useState } from "react";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [decVal, setDecVal] = useState(1);
  const [denVal, setDenVal] = useState(1);
  const calculate = (dec, den) => {
    const fractionsArray = new Array(den + 1);
    for (let n = 0; n <= den; n++) {
      fractionsArray[n] = n / den;
    }
    console.log("fractions: ");
    console.log(fractionsArray);
    // const closest = fractionsArray.reduce(function (prev, curr) {
    //   return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
    // });
    setShowResults(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <img
          src="/buildingsvgturquoise.svg"
          alt="An SVG of a construction worker checking a clipboard"
          className={styles.heroimg}
        />
        <h4>Welcome to...</h4>
        <h1>...Lucas&apos;s Conversion Tool!</h1>

        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={showResults ? "results" : "input"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {showResults ? <ResultsSection /> : <InputSection />}
          </motion.div>
        </AnimatePresence>
        <div className={styles.buttonHolder}>
          <button
            onClick={() => {
              showResults ? setShowResults(false) : calculate(decVal, denVal);
            }}
          >
            {showResults ? "Change Input" : "View Results"}
          </button>
        </div>
      </div>
    </div>
  );

  function InputSection() {
    return (
      <div className={styles.inputSection}>
        <h5>
          Please enter the decimal you want converted, and the denominator of
          the fraction you want it converted to.
        </h5>
        <form className={styles.inputFields}>
          <label>
            <h3>Decimal value</h3>

            <input
              // type="text"
              type="number"
              //pattern="\d*"
              inputMode="decimal"
              value={decVal}
              onChange={(e) => {
                //const result = e.target.value.replace(/\D/g, "");
                const result = e.target.value;
                console.log(result);
                setDecVal(result);
              }}
            />
          </label>
          <label>
            <h3>Fraction denominator</h3>
            <input
              // type="text"
              type="text"
              //pattern="\d*"
              inputMode="decimal"
              value={denVal}
              onChange={(e) => {
                // const result = e.target.value.replace(/\D/g, "");
                // console.log(result);
                // setDenVal(result);
                const result = e.target.value;
                console.log(result);
                setDenVal(result);
              }}
            />
          </label>
        </form>
      </div>
    );
  }

  function ResultsSection() {
    return (
      <div>
        <h2>Results Section</h2>
      </div>
    );
  }
}
