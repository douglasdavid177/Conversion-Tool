import { useEffect, useRef, useState, useCallback } from "react";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence, LayoutGroup, m } from "framer-motion";
import HomeSection from "../components/homesection";
import AboutSection from "../components/aboutsection";
import DecToFracSection from "../components/dectofrac/decfracsection";
import UnitConversionSection from "../components/unitconversion/unitconversionsection";
import NavPanel from "../components/navpanel";

export default function Home() {
  const [mainSectionKey, setMainSectionKey] = useState(0); // Triggers page scrolling to top before setting 'actual' state
  const [actualMainSectionKey, setActualMainSectionKey] = useState(0); // The id of the active page because the app uses state-based routing
  const [showResults, setShowResults] = useState(false); // Triggers page scrolling to top before setting 'actual' state
  const [actuallyShowResults, setActuallyShowResults] = useState(false); // controls Whether input or result of a particular tool is shown
  const [attemptCalculate, setAttemptCalculate] = useState(false); // Triggers the active tool to run its calculate function
  const [navPanelOpen, setNavPanelOpen] = useState(false); // Controls whether navigation panel is open or not
  const [showHeading, setShowHeading] = useState(true); // Controls whether app title is shown or not
  const [dummyVar, setDummyVar] = useState(false); // A variable that is never applied anywhere and whose only purpose is to trigger a rerender
  const containerRef = useRef();

  useEffect(() => {
    // Begins switching to new section by scrolling to top of page, at which point a scroll listener on the scrollable container
    // will set actual main section key to match the desired key, causing animatepresence to display a different section
    scrollToTop();
    checkScroll();
  }, [mainSectionKey]);

  useEffect(() => {
    // When sections actually chnage, Make sure tools are loaded in on their input page and are loaded in fresh, clean and with no remembered values
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
                {/*the app title and subheading will only display on the 'home' and 'about' pages*/}
                <AnimatePresence
                  onExitComplete={() => {
                    // setDummyVar(!dummyVar);
                    // void containerRef.current.offsetTop;
                  }}
                >
                  {actualMainSectionKey < 2 && showHeading && (
                    <motion.div
                      key={"headertext"}
                      initial={{ translateY: 50, opacity: 0 }}
                      animate={{
                        translateY: 0,
                        opacity: 1,
                      }}
                      exit={{
                        translateY: -30,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: 0.05,
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
                  //setDummyVar(!dummyVar);
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
                  }}
                  transition={{
                    duration: 0.35,
                    delay: 0.05,
                  }}
                >
                  {componentFromKey(actualMainSectionKey)}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            <motion.div
              layout
              transition={{
                duration: 0.4,
              }}
              className="debuggin"
            >
              <AnimatePresence
                onExitComplete={() => {
                  // If the button is exiting, we must be switching to a non-tool such as home or about which requires main heading to be shown
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
                        duration: 0.6,
                        delay: 0.825,
                        ease: [0.1, 0.1, 0, 1],
                      },
                    }}
                    exit={{
                      translateY: -30,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.35,
                      delay: 0.05,
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
            addCommas={addCommasToNumber}
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
            addCommas={addCommasToNumber}
          />
        );
      default:
        return <HomeSection />;
    }
  }

  // Runs automatically every time content scroll container detects change in scroll position
  function checkScroll() {
    const diffKey = actualMainSectionKey != mainSectionKey;
    const diffShowRes = actuallyShowResults != showResults;

    // If we reach the top of the page and there's a mismatch between desired and actual values for a state variable,
    // then update actual to match desired
    // The delay gives time to add the layout property back to the buttonholder
    if (containerRef.current.scrollTop < 15 && (diffKey || diffShowRes)) {
      setTimeout(() => {
        if (diffKey) {
          if (actualMainSectionKey > 1) setShowHeading(false);
          setActualMainSectionKey(mainSectionKey);
        }
        if (diffShowRes) {
          setActuallyShowResults(showResults);
        }
      }, 20);
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
  function resetInput() {
    setShowResults(false);
    setAttemptCalculate(false);
  }
  function smoothScrollTo(targetRef) {
    // Attempt trigger rerender to ensure no layout transitions are stuck
    void containerRef.current.offsetTop;
    setDummyVar(!dummyVar);
    targetRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  function addCommasToNumber(num) {
    // Regex that looks for triplets of digits adds commas after them
    let parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }
}
