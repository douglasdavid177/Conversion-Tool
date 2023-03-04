import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import InputSection from "./inputsectioncurrency";
import ResultsSection from "./resultssectioncurrency";
import styles from "../../styles/mainsection.module.css";
import {
  getCurrenciesObject,
  getCurrencyRatesObject,
  ConvertBetweenCurrencies,
} from "../../apifunctions";

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
  const [currencyObject, setcurrencyObject] = useState(null);
  const [currencyRatesObj, setCurrencyRatesObj] = useState(null);

  const [curKey, setCurKey] = useState("input");
  const [prevKey, setPrevKey] = useState("input");

  const mainSectionRef = useRef(null);
  const subSectionRef = useRef(null);

  const [timer, setTimer] = useState(null);

  useEffect(() => {
    async function getCurrencies() {
      const [currencies, rates] = await Promise.all([
        getCurrenciesObject(),
        getCurrencyRatesObject(),
      ]);
      setcurrencyObject(currencies);
      setCurrencyRatesObj(rates);
    }
    getCurrencies();
    //getRates();
  }, []);

  useEffect(() => {
    if (props.attemptCalculate) {
      calculate(startValString, fromCType, toCType);
    }
  }, [props.attemptCalculate]);

  // useEffect(() => {
  //   console.log("height: " + inputHeight);
  // }, [inputHeight]);

  useEffect(() => {
    if (!props.showResults) {
      setLoading(false);
      if (timer) clearTimeout(timer);
    }
    setKey();
    // setCurKey(findKey());
  }, [props.showResults]);

  useEffect(() => {
    setKey();
    // setCurKey(findKey());
  }, [loading]);

  const showResultsScreen = props.showResults && loading == false;
  const theKey = findKey();
  // console.log("the key is... " + theKey);

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
            //console.log("the key is: " + theKey);
          }}
        >
          <motion.div
            //key={showResultsScreen ? "results" : "input"}
            key={theKey}
            initial={{ translateY: 30, opacity: 0 }}
            animate={{
              translateY: 0,
              opacity: 1,
              transition: {
                duration: curKey == "loading" ? 0 : 0.35,
                delay: curKey != "loading" && prevKey == "loading" ? 0.225 : 0,
                // delay:
                //   mainSectionRef.current?.clientHeight > curHeight ? 0.25 : 0,
              },
            }}
            exit={{ translateY: -30, opacity: 0 }}
            transition={
              curKey == "loading"
                ? { duration: 0.0 }
                : { duration: 0.35, delay: props.scrollDelay }
            }
          >
            {LoadingInputResult()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
  function findKey() {
    if (loading) return "loading";
    if (!props.showResults) return "input";
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
    if (loading) {
      return (
        <div>
          <p>loading...</p>
        </div>
      );
    }

    if (!props.showResults) {
      return (
        <InputSection
          // key="inputsection"
          fromC={fromCType}
          toC={toCType}
          startStr={startValString}
          setStartStrFunc={setStartValString}
          setFromCFunc={setFromCType}
          setToCFunc={setToCType}
          triggerW={triggerWarning}
          setTriggerFunc={setTriggerWarning}
          setDecPlacesFunc={setDecimalPlaces}
          currencyObject={currencyObject}
          currencyRatesObj={currencyRatesObj}
        />
      );
    }
    return (
      <ResultsSection
        fromC={fromCType}
        toC={toCType}
        startStr={startValString}
        result={resultsVal}
        decimalPlaces={decimalPlaces}
        addCommas={props.addCommas}
        currencyObject={currencyObject}
        currencyRatesObj={currencyRatesObj}
      />
    );
  }

  async function calculate(num, fromC, toC) {
    const val = Number(num);
    if (
      val == 0 ||
      isNaN(val) ||
      isNaN(currencyRatesObj[fromC]) ||
      isNaN(currencyRatesObj[toC])
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

    const finalResult = 0;
    setResultsVal(finalResult);
    setLoading(true);
    props.setShowResults(true);
    const [answer, obj] = await Promise.all([
      ConvertBetweenCurrencies(fromC, toC, val),
      getCurrencyRatesObject(),
    ]);

    // console.log("answer: ");
    // console.log(answer);

    // const answer =
    //   //await grabFromOnline();
    //   await ConvertBetweenCurrencies(fromC, toC, val);

    setResultsVal(answer);
    setCurrencyRatesObj(obj);
    setLoading(false);
  }

  async function grabFromOnline() {
    await new Promise((resolve) => setTimer(setTimeout(resolve, 2500))); // Creates a timer and sets it to the state variable at the same timd
  }
};
export default CurrencyExchangeSection;
