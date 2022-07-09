import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import {
  motion,
  AnimatePresence,
  AnimateSharedLayout,
  LayoutGroup,
} from "framer-motion";
// import InputSectionDecToFrac from "../components/inputsectionfrac";
// import ResultsSection from "../components/resultssection";
import HomeSection from "../components/homesection";
import DecToFracSection from "../components/dectofrac/decfracsection";

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [attemptCalculate, setAttemptCalculate] = useState(false);
  const [useFixedLayout, setUseFixedLayout] = useState(false); // Not happy with how this turned out so it's not in use
  const compRef = useRef();

  useEffect(() => {
    //fixHeight();
  }, []);

  return (
    <div
      className={`${styles.container} ${
        useFixedLayout ? styles.fixedLayout : {}
      }`}
      ref={compRef}
    >
      <div className={styles.content}>
        <LayoutGroup>
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

          <motion.div layout>
            <DecToFracSection
              showResults={showResults}
              setShowResults={setShowResults}
              attemptCalculate={attemptCalculate}
              setAttemptCalculate={setAttemptCalculate}
            />
          </motion.div>

          <motion.div layout>
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
        </LayoutGroup>
      </div>
    </div>
  );

  function gotoResults() {
    //console.log(showResults);
    //calculate(inputVal1, inputVal2);
    //setShowResults(true);
    setAttemptCalculate(true);
  }
  function resetInput() {
    setShowResults(false);
    setAttemptCalculate(false);
  }
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
}
