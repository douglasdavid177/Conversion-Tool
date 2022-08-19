import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence, LayoutGroup, m } from "framer-motion";
import HomeSection from "../components/homesection";
import AboutSection from "../components/aboutsection";
import DecToFracSection from "../components/dectofrac/decfracsection";
import UnitConversionSection from "../components/unitconversion/unitconversionsection";
import NavPanel from "../components/navpanel";

export default function Home() {
  const [actualMainSectionKey, setActualMainSectionKey] = useState(0);
  const [mainSectionKey, setMainSectionKey] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [attemptCalculate, setAttemptCalculate] = useState(false);
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [dummyVar, setDummyVar] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    // containerRef.current.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    checkScroll();

    void containerRef.current.offsetHeight;
    scrollToTop();
    // scrollDownSlightly();
    setDummyVar(!dummyVar);
    //setActualMainSectionKey(mainSectionKey);
  }, [mainSectionKey]);

  useEffect(() => {
    void containerRef.current.offsetHeight;
    resetInput(false);
  }, [actualMainSectionKey]);

  return (
    <div>
      <motion.div className={`${styles.container}`}>
        <motion.div
          className={styles.content}
          ref={containerRef}
          onScroll={checkScroll}
          layout
          // layoutScroll
        >
          <LayoutGroup>
            <motion.div>
              <div className={styles.header}>
                <img
                  src="/workersvg-turquoise.svg"
                  alt="An SVG of a construction worker checking a clipboard"
                  className={styles.heroimg}
                />
                <h5>Welcome to the...</h5>
                {/* <h1>Lucas&apos;s Numerical Conversion Multi-Tool!</h1> */}
                <h1>Ultimate Number Conversion Multi-Tool!</h1>
              </div>
            </motion.div>
            {/* <motion.div layoutId="headerMark">beep</motion.div> */}

            <AnimatePresence
              exitBeforeEnter
              onExitComplete={() => {
                setDummyVar(!dummyVar);
              }}
            >
              <motion.div
                // layout
                key={actualMainSectionKey}
                initial={{ translateY: 30, opacity: 0 }}
                animate={{
                  translateY: 0,
                  opacity: 1,
                  transition: {
                    duration: 0.35,
                    delay: 0.05,
                  },
                }}
                exit={{
                  translateY: -10,
                  opacity: 0,
                  transition: {
                    duration: 0.35,
                    delay: 0.15,
                  },
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                <motion.div>
                  {componentFromKey(actualMainSectionKey)}
                </motion.div>
              </motion.div>
            </AnimatePresence>
            <motion.div layout className="debuggin">
              <AnimatePresence>
                {actualMainSectionKey > 1 && (
                  <motion.div
                    // layoutId="buttonHolderr"

                    key="buttonholder"
                    initial={{ translateY: 50, opacity: 0 }}
                    animate={{
                      translateY: 0,
                      opacity: 1,
                      transition: { duration: 0.55, delay: 0.75 },
                    }}
                    exit={{
                      translateY: -10,
                      opacity: 0,
                      transition: { duration: 0.35, delay: 0.15 },
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  >
                    <motion.div
                      // layout
                      layoutId="buttonHolder"
                      className={`${styles.buttonHolder}, ${"debuggin"}`}
                    >
                      <button
                        onClick={() => {
                          showResults ? resetInput() : gotoResults();
                        }}
                        className={
                          showResults ? styles.secondary : styles.primary
                        }
                      >
                        {showResults ? "Change Input" : "View Results"}
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </motion.div>
      </motion.div>

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
    </div>
  );

  function checkScroll() {
    if (containerRef.current.scrollTop < 2) {
      void containerRef.current.offsetHeight;
      setDummyVar(!dummyVar);
      setTimeout(() => {
        setActualMainSectionKey(mainSectionKey);
      }, 15);
    }
  }
  function scrollUpSlightly() {
    containerRef.current.scrollBy({
      top: -1,
      left: 0,
      behavior: "smooth",
    });
  }
  function scrollDownSlightly() {
    containerRef.current.scrollBy({
      top: 1,
      left: 0,
      behavior: "smooth",
    });
  }
  function scrollToTop() {
    containerRef.current.scrollTo({
      top:
        // containerRef.current.scrollTop > 0 ? 0 : containerRef.current.scrollTop,
        0,
      left: 0,
      behavior: "smooth",
    });
  }
  function getKey() {
    return mainSectionKey;
  }
  function TestComp(props) {
    return <div></div>;
  }

  // function ActionButton(props) {
  //   return (
  //     <button
  //       onClick={() => {
  //         showResults ? resetInput() : gotoResults();
  //       }}
  //       className={showResults ? styles.secondary : styles.primary}
  //     >
  //       {showResults ? "Change Input" : "View Results"}
  //     </button>
  //   );
  // }
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
            setDummyVar={setDummyVar}
            dummyVar={dummyVar}
          />
        );
      case 3:
        return (
          <UnitConversionSection
            showResults={showResults}
            setShowResults={setShowResults}
            attemptCalculate={attemptCalculate}
            setAttemptCalculate={setAttemptCalculate}
            setDummyVar={setDummyVar}
            dummyVar={dummyVar}
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
    scrollUpSlightly();
  }
  function resetInput(scrollSlightly = true) {
    setShowResults(false);
    setAttemptCalculate(false);
    if (scrollSlightly) {
      scrollUpSlightly();
    }
  }
  function fixHeight() {
    const winheight = window.innerHeight;
    const compHeight = containerRef.current.clientHeight;
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
