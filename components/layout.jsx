import React, { useEffect, useRef, useState, useCallback } from "react";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence, LayoutGroup, m } from "framer-motion";
import HomeSection from "../components/homesection";
import AboutSection from "../pages/aboutsection";
import DecToFracSection from "../pages/decfracsection";
import UnitConversionSection from "../pages/unitconversionsection";
import BaseConversionSection from "../pages/baseconversionsection";
import CurrencyExchangeSection from "../pages/currencyexhangesection";
import NavPanel from "../components/navpanel";
import { useRouter } from "next/router";

function Layout(props) {
  const [mainSectionKey, setMainSectionKey] = useState(0); // Triggers page scrolling to top before setting 'actual' state
  const [actualMainSectionKey, setActualMainSectionKey] = useState(0); // The id of the active page because the app uses state-based routing
  const [showResults, setShowResults] = useState(false); // Triggers page scrolling to top before setting 'actual' state
  const [actuallyShowResults, setActuallyShowResults] = useState(false); // controls Whether input or result of a particular tool is shown
  const [attemptCalculate, setAttemptCalculate] = useState(false); // Triggers the active tool to run its calculate function
  const [navPanelOpen, setNavPanelOpen] = useState(false); // Controls whether navigation panel is open or not
  const [showHeading, setShowHeading] = useState(false); // Controls whether app title is shown or not
  const [showButton, setShowButton] = useState(false); // Controls whether app title is shown or not
  const [scrollToTopDelay, setScrollTopDelay] = useState(0);
  const [dummyVar, setDummyVar] = useState(false); // A variable that is never applied anywhere and whose only purpose is to trigger a rerender
  const scrollRoutine = useRef();
  const containerRef = useRef();
  const router = useRouter();

  useEffect(() => {
    checkAndSetHeaderAndButton();
    setMainSectionKey(numberFromRoute(router.asPath));
  }, []);
  useEffect(() => {
    //scrollToTop();
    resetInput();
    setMainSectionKey(numberFromRoute(router.asPath));
  }, [router.asPath]);

  useEffect(() => {
    // Begins switching to new section by scrolling to top of page, at which point a scroll listener on the scrollable container
    // will set actual main section key to match the desired key, causing animatepresence to display a different section
    // scrollToTop(mainSectionKey == numberFromRoute(router.asPath));
    scrollToTop();
    //checkScroll(false); // Add false param to instantly chnage route. If true (default) route won't update to match target route unless scroll pos is 0
    checkScroll();
    //resetInput();
  }, [mainSectionKey]);

  // useEffect(() => {
  //   // When sections actually chnage, Make sure tools are loaded in on their input page and are loaded in fresh, clean and with no remembered values
  // }, [actualMainSectionKey]);

  useEffect(() => {
    scrollToTop();
    checkScroll();
  }, [showResults]);

  // const scrollToTopDelay = containerRef.current
  //   ? containerRef.current.scrollTop * 0.00015
  //   : 0.0;

  const baseExitDelay = 0.05; //0.15;
  const baseTransDur = 0.35;

  let currentKey = 0;
  switch (router.asPath) {
    case "/index":
      currentKey = 0;
      break;
    case "/aboutsection":
      currentKey = 1;
      break;
  }

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
                  {checkShowHeading() && showHeading && (
                    <motion.div
                      key={"headertext"}
                      initial={{ translateY: 50, opacity: 0 }}
                      animate={{
                        translateY: 0,
                        opacity: 1,
                        transition: {
                          duration: baseTransDur,
                          delay: 0,
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
                  //   if (numberFromRoute() < 2) {
                  //     setShowHeading(true);
                  //     //   console.log("yay...!");
                  //   }
                  //   if (numberFromRoute() > 1) {
                  //     setShowButton(true);
                  //   }
                  //   setDummyVar(!dummyVar);

                  checkAndSetHeaderAndButton();
                }}
              >
                {(showHeading || showButton) && (
                  <motion.div
                    key={router.asPath}
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
                      setNavPanelOpen,
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
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="debuggin"
              layout
              transition={{
                duration: 0.4,
              }}
            >
              <AnimatePresence
                onExitComplete={() => {
                  // If the button is exiting, we must be switching to a non-tool such as home or about which requires main heading to be shown
                  //setScrollTopDelay(0);
                  //setShowHeading(true);
                  //checkAndSetHeaderAndButton();
                }}
              >
                {checkShowButton() && showButton && (
                  <motion.div
                    key="buttonholder"
                    initial={{ translateY: 55, opacity: 0 }}
                    animate={{
                      translateY: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.6 + 0,
                        //baseTransDur,
                        delay:
                          baseTransDur * 0.85 +
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
        numberFromRoute={numberFromRoute}
      />
    </div>
  );

  // Runs automatically every time content scroll container detects change in scroll position
  function checkScroll(waitTilTop = true) {
    if (!containerRef.current) {
      return;
    }

    const diffKey = actualMainSectionKey != mainSectionKey;
    const diffShowRes = actuallyShowResults != showResults;
    const scrollDist = containerRef.current.scrollTop - 15;

    let scrollDelay =
      Math.log(scrollDist > 0 ? scrollDist : 0) / Math.log(7 / 8);
    scrollDelay *= 0.0075;
    scrollDelay = Math.abs(scrollDelay);
    setScrollTopDelay(scrollDelay);

    if (scrollDist <= 30) {
      //console.log("top...");
      if (diffShowRes) {
        setActuallyShowResults(showResults);
      }
      if (diffKey) {
        changeKey(mainSectionKey);
      }

      setScrollTopDelay(0);
    } else {
      console.log("not top...");

      if (!waitTilTop) {
        if (diffKey) {
          changeKey(mainSectionKey);
          // setScrollTopDelay(scrollDist * 0.00018);
        }
      }
    }

    // If we reach the top of the page and there's a mismatch between desired and actual values for a state variable,
    // then update actual to match desired
    // The delay gives time to add the layout property back to the buttonholder
    // else if (scrollDist <= 15 && (diffKey || diffShowRes)) {
    //   // Prev threshold was 15 from top with 20 ms timeout delay
    //   if (diffKey) {
    //     if (actualMainSectionKey > 1) setShowHeading(false);
    //     setActualMainSectionKey(mainSectionKey);
    //   }
    //   if (diffShowRes) {
    //     setActuallyShowResults(showResults);
    //   }
    //   //setTimeout(() => {}, 0);
    // }
  }

  function changeKey(newKey) {
    // if (newKey > 1) setShowHeading(false);
    // if (newKey <= 1) setShowButton(false);
    //console.log(scrollToTopDelay);
    setActualMainSectionKey(newKey);

    //setTimeout(() => {}, 0);

    let route = ``;
    console.log("key: " + newKey);
    switch (newKey) {
      case 0:
        route = `/`;
        router.push(router.basePath);
        break;
      case 1:
        route = `/aboutsection`;
        break;
      case 2:
        route = `/decfracsection`;
        break;
      case 3:
        route = `/baseconversionsection`;
        break;
      case 4:
        route = `/unitconversionsection`;
        break;
      case 5:
        route = `/currencyexhangesection`;
        break;
      default:
        break;
    }

    router.push(route);
    // console.log(router.basePath);
  }
  function scrollUpSlightly() {
    containerRef.current?.scrollBy({
      top: -1,
      left: 0,
      behavior: "smooth",
    });
  }
  function scrollDownSlightly() {
    containerRef.current?.scrollBy({
      top: 1,
      left: 0,
      behavior: "smooth",
    });
  }
  function scrollToTop(manualScrolling = true) {
    if (!manualScrolling) {
      containerRef.current?.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      startScrollingTowardsTop();
    }
  }
  function startScrollingTowardsTop() {
    scrollSmoothlyTo(0);
    return;
    const container = containerRef.current;
    if (!container) return;
    console.log("dist: " + container.scrollTop);

    let starttime = null;
    let prevtime = null;

    // const totalDist = container.scrollTop;
    // const durationMS = totalDist / 1.75;
    requestAnimationFrame(function scroll(timestamp) {
      if (starttime == null) starttime = timestamp;
      if (prevtime == null) prevtime = starttime;

      // const elapsed = timestamp - starttime;
      // const progressPercent = elapsed / durationMS;
      const difference = timestamp - prevtime;
      // const differencePercent = difference / durationMS;
      // const scrollAmount = differencePercent * totalDist;

      if (container.scrollTop > 1) {
        const totalScrollLeft = container.scrollTop;
        let scrollStep = totalScrollLeft / 10;
        if (difference > 0.0) {
          scrollStep *= difference;
          scrollStep *= 0.0625;
          console.log("diff: " + difference);
        }
        //if (scrollStep > 25) scrollStep = 25;
        containerRef.current?.scrollBy({
          top: -scrollStep,
          left: 0,
          behavior: "auto",
        });
        prevtime = timestamp;
        requestAnimationFrame(scroll);
      }
    });
  }

  function scrollSmoothlyTo(scrollPos) {
    const container = containerRef.current;
    if (!container) return;
    const distToCover = scrollPos - container.scrollTop;
    let starttime = null;
    let prevtime = null;

    requestAnimationFrame(function scroll(timestamp) {
      if (starttime == null) starttime = timestamp;
      if (prevtime == null) prevtime = starttime;
      const difference = timestamp - prevtime;

      if (container.scrollTop > 1) {
        let scrollStep = 0;
        scrollStep = scrollPos - container.scrollTop;
        scrollStep /= 8;
        if (difference > 0.0) {
          scrollStep *= difference;
          scrollStep *= 0.0625;
          scrollStep *= 1;
          //console.log("diff: " + difference);

          containerRef.current?.scrollBy({
            top: scrollStep,
            left: 0,
            behavior: "auto",
          });
        }
        prevtime = timestamp;
        requestAnimationFrame(scroll);
      }
    });
  }

  function scrollTowardsTop() {
    if (!containerRef.current) return;
    let totalScrollLeft = containerRef.current?.scrollTop;
    if (totalScrollLeft > 0.5) {
      let scrollStep = totalScrollLeft / 20;
      if (scrollStep > 15) scrollStep = 15;

      containerRef.current?.scrollBy({
        top: -scrollStep,
        left: 0,
        behavior: "auto",
      });
    } else {
      clearInterval(scrollRoutine.current);
      //setScrollRoutine(null);
      //printRoutine();
    }
  }

  function printRoutine() {
    console.log(scrollRoutine);
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
    void containerRef.current?.offsetTop;
    setDummyVar(!dummyVar);
    targetRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }

  function addCommasToNumber(num) {
    // Regex that looks for triplets of digits adds commas after them
    let parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  function numberFromRoute(path = router.asPath) {
    let num = 0;
    switch (path) {
      case `/`:
        num = 0;
        break;
      case `/aboutsection`:
        num = 1;
        break;
      case `/decfracsection`:
        num = 2;
        break;
      case `/baseconversionsection`:
        num = 3;
        break;
      case `/unitconversionsection`:
        num = 4;
        break;
      case `/currencyexhangesection`:
        num = 5;
        break;
      default:
        break;
    }
    return num;
  }

  function checkShowHeading(usePath = true) {
    if (usePath) {
      if (numberFromRoute(router.asPath) < 2) return true;
      return false;
    }
    if (actualMainSectionKey < 2) return true;
    return false;
  }
  function checkShowButton(usePath = true) {
    if (usePath) {
      if (numberFromRoute(router.asPath) > 1) return true;
      return false;
    }
    if (actualMainSectionKey > 1) return true;
    return false;
  }
  function checkAndSetHeaderAndButton() {
    let num = numberFromRoute(router.asPath);
    //num = actualMainSectionKey;
    if (num < 2) {
      setShowButton(false);
      setShowHeading(true);
    }
    if (num > 1) {
      setShowHeading(false);
      setShowButton(true);
    }
  }
}
export default Layout;
