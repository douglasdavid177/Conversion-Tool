import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import InputSection from "../components/currencyex/inputsectioncurrency";
import ResultsSection from "../components/currencyex/resultssectioncurrency";
import styles from "../styles/mainsection.module.css";
import { ConvertBetweenCurrencies } from "../apifunctions";

const CurrencyExchangeSection = (props) => {
  const [startValString, setStartValString] = useState("");
  const [fromCType, setFromCType] = useState("");
  const [toCType, setToCType] = useState("");
  const [decimalPlaces, setDecimalPlaces] = useState(2);
  const [resultsVal, setResultsVal] = useState(-1); // The numerator
  const [triggerWarning, setTriggerWarning] = useState(false); // Controls animation of instructions heading
  const [loading, setLoading] = useState(false);
  const [prevLoading, setPrevLoading] = useState(loading);
  const [curHeight, setCurHeight] = useState(2);
  const [prevHeight, setPrevHeight] = useState(3);
  const [curKey, setCurKey] = useState("input");
  const [prevKey, setPrevKey] = useState("input");

  const mainSectionRef = useRef(null);
  const subSectionRef = useRef(null);

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    props.getCurrencies();
  }, []);

  useEffect(() => {
    if (props.attemptCalculate) {
      calculate(startValString, fromCType, toCType);
    }
  }, [props.attemptCalculate]);

  useEffect(() => {
    if (!props.actuallyShowResults) {
      setLoading(false);
      if (timer) clearTimeout(timer);
    }
    setKey();
  }, [props.actuallyShowResults]);

  useEffect(() => {
    setKey();
  }, [loading]);

  const showResultsScreen = props.actuallyShowResults && loading == false;
  const theKey = findKey();

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
            const target = props.actuallyShowResults
              ? subSectionRef
              : mainSectionRef;
            let delay;
            switch (theKey) {
              case "input":
                delay = 420;
                break;

              case "result":
                delay = 750;
                break;
              case "loading":
                delay = 70;
                return; // Don't scroll down at all if currently loading
            }
            setTimeout(() => {
              props.smoothScrollTo(target);
            }, delay);
          }}
        >
          <motion.div
            key={theKey}
            initial={{ translateY: 30, opacity: 0 }}
            animate={{
              translateY: 0,
              opacity: 1,
              transition: {
                duration: curKey == "loading" ? 0 : 0.35,
                delay: curKey != "loading" && prevKey == "loading" ? 0.225 : 0,
              },
            }}
            exit={{ translateY: -30, opacity: 0 }}
            transition={
              curKey == "loading"
                ? { duration: 0.0 }
                : { duration: 0.35, delay: 0 }
            }
          >
            {LoadingInputResult()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
  function findKey() {
    if (!props.actuallyShowResults) return "input";
    if (loading) return "loading";

    return "result";
  }
  function setKey() {
    const k = findKey();
    if (k != curKey) {
      setPrevKey(curKey);
      setCurKey(k);
    }
    const h = mainSectionRef.current.clientHeight;
    if (h != curHeight) {
      setPrevHeight(curHeight);
      setCurHeight(mainSectionRef.current?.clientHeight);
    }
  }
  function LoadingInputResult() {
    if (!props.actuallyShowResults) {
      return (
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
          currencyObject={props.currencyObject}
          currencyRatesObj={props.currencyRatesObj}
        />
      );
    }
    if (loading) {
      return (
        <div>
          <p>loading...</p>
        </div>
      );
    }
    return (
      <ResultsSection
        fromC={fromCType}
        toC={toCType}
        startStr={startValString}
        result={resultsVal}
        decimalPlaces={decimalPlaces}
        addCommas={props.addCommasToNumber}
        currencyObject={props.currencyObject}
        currencyRatesObj={props.currencyRatesObj}
      />
    );
  }

  async function calculate(num, fromC, toC) {
    const val = Number(num);
    if (
      val == 0 ||
      isNaN(val) ||
      isNaN(props.currencyRatesObj[fromC]) ||
      isNaN(props.currencyRatesObj[toC])
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
    setLoading(true);
    props.setShowResults(true);

    await waitForTransition();
    await simulateLoading();
    const refetch = Math.abs(props.curAPITimestamp - Date.now()) > 300000; // Greater than 5 minutes
    if (refetch) {
      props.getCurrencies(true);
    }
    const [answer] = await Promise.all([
      ConvertBetweenCurrencies(fromC, toC, val, props.currencyRatesObj),
    ]);

    setResultsVal(answer);
    setLoading(false);
  }

  async function grabFromOnline() {
    await new Promise((resolve) => setTimer(setTimeout(resolve, 2500)));
  }
  async function waitForTransition() {
    await new Promise((resolve) => setTimer(setTimeout(resolve, 800)));
  }
  async function simulateLoading() {
    await new Promise((resolve) =>
      setTimer(setTimeout(resolve, Math.floor(Math.random() * 1000)))
    );
  }
};
export default CurrencyExchangeSection;
