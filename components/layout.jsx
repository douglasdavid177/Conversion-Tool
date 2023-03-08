import { useEffect, useRef, useState, useCallback } from "react";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence, LayoutGroup, m } from "framer-motion";
import HomeSection from "../components/homesection";
import AboutSection from "../components/aboutsection";
import DecToFracSection from "../components/dectofrac/decfracsection";
import UnitConversionSection from "../components/unitconversion/unitconversionsection";
import BaseConversionSection from "../components/baseconversion/baseconversionsection";
import CurrencyExchangeSection from "../components/currencyex/currencyexhangesection";
import NavPanel from "../components/navpanel";

function Layout(props) {
  const [mainSectionKey, setMainSectionKey] = useState(0); // Triggers page scrolling to top before setting 'actual' state
  const [actualMainSectionKey, setActualMainSectionKey] = useState(0); // The id of the active page because the app uses state-based routing
  const [showResults, setShowResults] = useState(false); // Triggers page scrolling to top before setting 'actual' state
  const [actuallyShowResults, setActuallyShowResults] = useState(false); // controls Whether input or result of a particular tool is shown
  const [attemptCalculate, setAttemptCalculate] = useState(false); // Triggers the active tool to run its calculate function
  const [navPanelOpen, setNavPanelOpen] = useState(false); // Controls whether navigation panel is open or not
  const [showHeading, setShowHeading] = useState(true); // Controls whether app title is shown or not
  const [scrollToTopDelay, setScrollTopDelay] = useState(0);
  const [dummyVar, setDummyVar] = useState(false); // A variable that is never applied anywhere and whose only purpose is to trigger a rerender
  const containerRef = useRef();

  useEffect(() => {
    // Begins switching to new section by scrolling to top of page, at which point a scroll listener on the scrollable container
    // will set actual main section key to match the desired key, causing animatepresence to display a different section
    scrollToTop();
    checkScroll(false); // Add false param to instantly chnage route. If true (default) route won't update to match target route unless scroll pos is 0
    resetInput();
  }, [mainSectionKey]);

  useEffect(() => {
    // When sections actually chnage, Make sure tools are loaded in on their input page and are loaded in fresh, clean and with no remembered values
    resetInput();
  }, [actualMainSectionKey]);

  useEffect(() => {
    scrollToTop();
    checkScroll();
  }, [showResults]);

  // const scrollToTopDelay = containerRef.current
  //   ? containerRef.current.scrollTop * 0.00015
  //   : 0.0;

  const baseExitDelay = 0.15;
  const baseTransDur = 0.45;

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
                {/*the app title and subheading will only display on the 'home' and 'about' pages*/}
                <AnimatePresence>
                  {actualMainSectionKey < 2 && showHeading && (
                    <motion.div
                      key={"headertext"}
                      initial={{ translateY: 50, opacity: 0 }}
                      animate={{
                        translateY: 0,
                        opacity: 1,
                        transition: {
                          duration: baseTransDur,
                          delay: 0 + 0,
                        },
                      }}
                      exit={{
                        translateY: -30,
                        opacity: 0,
                      }}
                      transition={{
                        duration: baseTransDur,
                        delay: baseExitDelay + scrollToTopDelay,
                      }}
                    >
                      <h5>Welcome to...</h5>
                      <h1>Lucas&apos;s Number Conversion Multi-Tool!</h1>
                      {/* <h1>Ultimate Number Conversion Multi-Tool!</h1> */}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/*This div represents multiple different divs (one at a time) based on the current key. They are the main tools and pages of the app */}
            <motion.div>
              <AnimatePresence
                exitBeforeEnter
                onExitComplete={() => {
                  if (actualMainSectionKey < 2) {
                    setShowHeading(true);
                    //   console.log("yay...!");
                  }
                  setDummyVar(!dummyVar);
                }}
              >
                <motion.div
                  key={actualMainSectionKey}
                  initial={{ translateY: 50, opacity: 0 }}
                  animate={{
                    translateY: 0,
                    opacity: 1,
                  }}
                  exit={{
                    translateY: -30,
                    opacity: 0,
                    transition: {
                      duration: baseTransDur,
                      delay: baseExitDelay + scrollToTopDelay,
                    },
                  }}
                  transition={{
                    duration: baseTransDur,
                    delay: 0,
                  }}
                >
                  {React.cloneElement(props.children, {
                    actuallyShowResults,
                    setShowResults,
                    attemptCalculate,
                    setAttemptCalculate,
                    setDummyVar,
                    dummyVar,
                    smoothScrollTo,
                    addCommasToNumber,
                  })}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="debuggin"
              layout
              transition={{
                duration: 0.5,
              }}
            >
              <AnimatePresence
                onExitComplete={() => {
                  // If the button is exiting, we must be switching to a non-tool such as home or about which requires main heading to be shown
                  //setScrollTopDelay(0);
                  setShowHeading(true);
                }}
              >
                {actualMainSectionKey > 1 && (
                  <motion.div
                    key="buttonholder"
                    initial={{ translateY: 55, opacity: 0 }}
                    animate={{
                      translateY: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.6 + 0,
                        delay:
                          baseTransDur * 2 +
                          scrollToTopDelay +
                          baseExitDelay * 1,
                        ease: [0.1, 0.1, 0, 1],
                      },
                    }}
                    exit={{
                      translateY: -30,
                      opacity: 0,
                    }}
                    transition={{
                      duration: baseTransDur,
                      delay: baseExitDelay + scrollToTopDelay,
                    }}
                  >
                    <div className={`${styles.buttonHolder}, ${"debuggin"}`}>
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
                    </div>
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
}

export default Layout;
