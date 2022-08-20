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
  const [actuallyShowResults, setActuallyShowResults] = useState(false);
  const [attemptCalculate, setAttemptCalculate] = useState(false);
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const [showHeading, setShowHeading] = useState(true);
  const [dummyVar, setDummyVar] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    scrollToTop();
    checkScroll();
  }, [mainSectionKey]);

  useEffect(() => {
    resetInput();
  }, [actualMainSectionKey]);

  useEffect(() => {
    scrollToTop();
    checkScroll();
  }, [showResults]);

  return (
    <div>
      <div className={`${styles.container}`}>
        <div
          className={styles.content}
          ref={containerRef}
          onScroll={checkScroll}
        >
          <LayoutGroup>
            <motion.div>
              <div className={styles.header}>
                <img
                  src="/workersvg-turquoise.svg"
                  alt="An SVG of a construction worker checking a clipboard"
                  className={styles.heroimg}
                />
                <AnimatePresence>
                  {actualMainSectionKey < 2 && showHeading && (
                    <motion.div
                      key={"headertext"}
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
                    >
                      {" "}
                      <h5>Welcome to the...</h5>
                      {/* <h1>Lucas&apos;s Numerical Conversion Multi-Tool!</h1> */}
                      <h1>Ultimate Number Conversion Multi-Tool!</h1>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
            <motion.div>
              <AnimatePresence exitBeforeEnter>
                <motion.div
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
                  {componentFromKey(actualMainSectionKey)}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <motion.div className="debuggin">
              <AnimatePresence
                onExitComplete={() => {
                  setShowHeading(true);
                }}
              >
                {actualMainSectionKey > 1 && (
                  <motion.div
                    key="buttonholder"
                    initial={{ translateY: 50, opacity: 0 }}
                    animate={{
                      translateY: 0,
                      opacity: 1,
                      transition: { duration: 0.55, delay: 0.65 },
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
                      layout
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
        </div>
      </div>

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

  function componentFromKey(key) {
    switch (key) {
      case 0:
        return <HomeSection setOpenNav={setNavPanelOpen} />;
      case 1:
        return <AboutSection />;

      case 2:
        return (
          <DecToFracSection
            showResults={actuallyShowResults}
            setShowResults={setShowResults}
            attemptCalculate={attemptCalculate}
            setAttemptCalculate={setAttemptCalculate}
            setDummyVar={setDummyVar}
            dummyVar={dummyVar}
            smoothScrollTo={smoothScrollTo}
          />
        );
      case 3:
        return (
          <UnitConversionSection
            showResults={actuallyShowResults}
            setShowResults={setShowResults}
            attemptCalculate={attemptCalculate}
            setAttemptCalculate={setAttemptCalculate}
            setDummyVar={setDummyVar}
            dummyVar={dummyVar}
            smoothScrollTo={smoothScrollTo}
          />
        );
      default:
        return <HomeSection />;
    }
  }

  function checkScroll() {
    if (containerRef.current.scrollTop < 2) {
      if (actualMainSectionKey > 1) setShowHeading(false);
      setActualMainSectionKey(mainSectionKey);
      setActuallyShowResults(showResults);
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
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }

  function gotoResults() {
    setAttemptCalculate(true);
  }
  function resetInput(scrollSlightly = false) {
    setShowResults(false);
    setAttemptCalculate(false);
    if (scrollSlightly) {
      // scrollUpSlightly();
    }
  }
  function smoothScrollTo(targetRef) {
    targetRef.current.scrollIntoView({
      behavior: "smooth",
    });
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
