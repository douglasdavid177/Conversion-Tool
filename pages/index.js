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
import NavPanel from "../components/navpanel";

export default function Home() {
  const [mainSectionKey, setMainSectionKey] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [attemptCalculate, setAttemptCalculate] = useState(false);
  const [useFixedLayout, setUseFixedLayout] = useState(false); // Not happy with how this turned out so it's not in use
  const [navPanelOpen, setNavPanelOpen] = useState(false);
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
      onClick={() => {
        if (!navPanelOpen) return;
        setNavPanelOpen(false);
      }}
    >
      <button
        className={styles.hamburger}
        onClick={() => {
          console.log("clicked burg...");
          setNavPanelOpen(!navPanelOpen);
        }}
      >
        <img src="./menu.svg"></img>
      </button>

      <NavPanel
        isOpen={navPanelOpen}
        setIsOpen={setNavPanelOpen}
        setSectionKey={setMainSectionKey}
      />

      <div className={styles.content}>
        <LayoutGroup>
          <motion.div layout>
            <div className={styles.header}>
              <img
                src="/workersvg-turquoise.svg"
                alt="An SVG of a construction worker checking a clipboard"
                className={styles.heroimg}
              />
              <h5>Welcome to...</h5>
              <h1>Lucas&apos;s Numerical Conversion Multi-Tool!</h1>
            </div>
          </motion.div>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              layout
              key={mainSectionKey}
              initial={{ translateY: 20, opacity: 0 }}
              animate={{ translateY: 0, opacity: 1 }}
              exit={{ translateY: -20, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {componentFromKey(mainSectionKey)}
            </motion.div>
          </AnimatePresence>
          <motion.div layout>
            {mainSectionKey > 0 ? (
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
            ) : (
              ""
            )}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );

  function componentFromKey(key) {
    switch (key) {
      case 0:
        return <HomeSection setOpenNav={setNavPanelOpen} />;
      case 1:
        return (
          <DecToFracSection
            showResults={showResults}
            setShowResults={setShowResults}
            attemptCalculate={attemptCalculate}
            setAttemptCalculate={setAttemptCalculate}
          />
        );
      default:
        return <HomeSection />;
    }
  }

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
