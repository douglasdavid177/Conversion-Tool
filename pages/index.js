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
import AboutSection from "../components/aboutsection";
import DecToFracSection from "../components/dectofrac/decfracsection";
import NavPanel from "../components/navpanel";

export default function Home() {
  const [targetMainSectionKey, setTargetMainSectionKey] = useState(0);
  const [mainSectionKey, setMainSectionKey] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [attemptCalculate, setAttemptCalculate] = useState(false);
  const [useFixedLayout, setUseFixedLayout] = useState(false); // Not happy with how this turned out so it's not in use
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const compRef = useRef();

  useEffect(() => {
    //fixHeight();
  }, []);

  function test(e) {
    console.log("scrollin...");
  }
  return (
    <motion.div
      onScroll={test}
      className={`${styles.container} ${
        useFixedLayout ? styles.fixedLayout : {}
      }`}
      ref={compRef}
      onClick={() => {
        if (!navPanelOpen) return;
        setNavPanelOpen(false);
      }}
    >
      <div className={styles.hamburgerHolder}>
        <button
          className={styles.hamburger}
          onClick={() => {
            console.log("clicked burg...");
            setNavPanelOpen(!navPanelOpen);
          }}
        >
          <img src="./menu.svg"></img>
        </button>
      </div>
      <NavPanel
        isOpen={navPanelOpen}
        setIsOpen={setNavPanelOpen}
        currentSectionKey={mainSectionKey}
        setSectionKey={setMainSectionKey}
      />

      <motion.div className={styles.content}>
        <LayoutGroup>
          <motion.div key={"header"} layout>
            <div className={styles.header}>
              <img
                src="/workersvg-turquoise.svg"
                alt="An SVG of a construction worker checking a clipboard"
                className={styles.heroimg}
              />
              <h5>Welcome to...</h5>
              <h1>Lucas&apos;s Numerical Conversion Multi-Tool!</h1>
            </div>
            <TestComp>
              <h3>maybe thisll show</h3>
            </TestComp>
          </motion.div>
          {/* <motion.div layout className={`${""} ${styles.debugging}`}> */}
          <motion.div layout>
            <AnimatePresence exitBeforeEnter>
              <motion.div
                layout
                key={mainSectionKey}
                initial={{ translateY: 20, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                exit={{ translateY: -20, opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div>{componentFromKey(mainSectionKey)}</div>
              </motion.div>
              <motion.div
                key={mainSectionKey > 1}
                className={`${styles.buttonHolder}, ${styles.debugging}`}
                initial={{ scaleY: 0.0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0.0 }}
              >
                {mainSectionKey > 1 && (
                  <button
                    onClick={() => {
                      showResults ? resetInput() : gotoResults();
                    }}
                    className={showResults ? styles.secondary : styles.primary}
                  >
                    {showResults ? "Change Input" : "View Results"}
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
          {/* </motion.div> */}
        </LayoutGroup>
      </motion.div>
    </motion.div>
  );

  function TestComp(props) {
    return <div></div>;
  }

  function ActionButton(props) {
    return (
      <button
        onClick={() => {
          showResults ? resetInput() : gotoResults();
        }}
        className={showResults ? styles.secondary : styles.primary}
      >
        {showResults ? "Change Input" : "View Results"}
      </button>
    );
  }
  function componentFromKey(key) {
    switch (key) {
      case 0:
        return <HomeSection setOpenNav={setNavPanelOpen} />;
      case 1:
        return <AboutSection />;

      case 2:
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
