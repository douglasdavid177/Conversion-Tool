import React, { useEffect, useRef, useState, useCallback } from "react";
import { animateScroll } from "react-scroll";
import styles from "../styles/Home.module.css";
import { motion, AnimatePresence, LayoutGroup, m } from "framer-motion";
import HomeSection from "../components/homesection";
import AboutSection from "../pages/aboutsection";
import DecToFracSection from "../pages/decfracsection";
import UnitConversionSection from "../pages/unitconversionsection";
import BaseConversionSection from "../pages/baseconversionsection";
import CurrencyExchangeSection from "../pages/currencyexhangesection";
import NavPanel from "../components/navpanel";
import {
  getCurrenciesObject,
  getCurrencyRatesObject,
  ConvertBetweenCurrencies,
} from "../apifunctions";
import { useRouter } from "next/router";
import { FaBars, FaHome } from "react-icons/fa";
import { HiBars3 } from "react-icons/hi2";

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
  const [currencyObject, setcurrencyObject] = useState(null);
  const [currencyRatesObj, setCurrencyRatesObj] = useState(null);
  const [curAPITimestamp, setcurAPITimestamp] = useState(null);
  const [dummyVar, setDummyVar] = useState(false); // A variable that is never applied anywhere and whose only purpose is to trigger a rerender
  const [currentlyAutoScrolling, setCurrentlyAutoScrolling] = useState(false);
  const [loadingPercent01, setLoadingPercen01] = useState(1.01);
  const [scrollPosAtLoadStart, setScrollPosAtLoadStart] = useState(0);
  const [loadingBarActive, setLoadingBarActive] = useState(false);
  const barVal = useRef(0.5);
  const loadingBarRef = useRef();
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
    scrollToTop(true);
    //checkScroll(false); // Add false param to instantly chnage route. If true (default) route won't update to match target route unless scroll pos is 0
    checkScroll(false);
    //resetInput();
  }, [mainSectionKey]);

  // useEffect(() => {
  //   // When sections actually chnage, Make sure tools are loaded in on their input page and are loaded in fresh, clean and with no remembered values
  // }, [actualMainSectionKey]);

  useEffect(() => {
    if (showResults) {
      scrollToTop();
    }
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
          id="scrollable"
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
                      currencyObject,
                      currencyRatesObj,
                      getCurrencies,
                      curAPITimestamp,
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
                          showResults ? resetInput(true) : gotoResults();
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

      <div className={styles.navBar}></div>
      <div className={styles.hamburgerHolder}>
        <button
          className={styles.hamburger}
          onClick={() => {
            setNavPanelOpen(!navPanelOpen);
          }}
        >
          {/* <img src="./menu.svg"></img> */}
          <FaBars />
          {/* <HiBars3 /> */}
        </button>
      </div>

      <button
        className={styles.homeButton}
        onClick={() => {
          if (router) {
            console.log("headin home");
            router.push("/");
          }
        }}
      >
        <FaHome />
      </button>

      <NavPanel
        isOpen={navPanelOpen}
        setIsOpen={setNavPanelOpen}
        currentSectionKey={mainSectionKey}
        setSectionKey={setMainSectionKey}
        numberFromRoute={numberFromRoute}
      />
      {/* <div className={styles.loadingSpinnerWrapper}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ ease: "linear", duration: 1, repeat: Infinity }}
        >
          <div className={styles.loadingSpinner}></div>
        </motion.div>
      </div> */}
      <AnimatePresence>
        {loadingPercent01 <= 1 && (
          <motion.div
            key={"loader"}
            //initial={{ translateY: 50, opacity: 0 }}
            animate={{
              translateY: 0,
              opacity: 1,
            }}
            exit={{
              translateY: 2.5,
              opacity: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0,
            }}
          >
            <div className={styles.loadingBar}>
              <div
                className={styles.loadingBarProgress}
                ref={loadingBarRef}
                //style={{ width: `${loadingPercent01 * 100}%` }}
              ></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Runs automatically every time content scroll container detects change in scroll position
  function checkScroll(waitTilTop = true) {
    if (!containerRef.current) {
      return;
    }
    //if (actualMainSectionKey != numberFromRoute(router.asPath)) return;

    const diffKey = actualMainSectionKey != mainSectionKey;
    const diffShowRes = actuallyShowResults != showResults;
    const scrollDist = containerRef.current.scrollTop - 10;

    let scrollDelay = (scrollDist > 0 ? scrollDist : 0) * 0.65 * 0.001; // Lniear increase, result in seconds
    scrollDelay *= scrollDelay; // Now it's a square function
    scrollDelay /= 0.6; // Bring it back down based on 'average time'
    scrollDelay += 0.2;

    //   Math.log(scrollDist > 0 ? scrollDist : 0) / Math.log(7 / 8);
    // scrollDelay *= 0.007;
    // scrollDelay = Math.abs(scrollDelay);
    if (!currentlyAutoScrolling) setScrollTopDelay(scrollDelay);

    if (scrollDist < 10) {
      //console.log("top...");
      if (diffShowRes) {
        setActuallyShowResults(showResults);
      }
      if (diffKey) {
        changeKey(mainSectionKey);
      }

      setScrollTopDelay(0);
    } else {
      // console.log("not top...");

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

    //setTimeout(() => {}, 0);

    let route = ``;
    console.log("key: " + newKey);
    switch (newKey) {
      case 0:
        route = `/`;
        //router.push(router.basePath);
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
    setActualMainSectionKey(newKey);

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
  function fillLoadingBar(ScrolldurationMS, exitAnimDuratinMS) {
    setLoadingPercen01(0);

    if (ScrolldurationMS == 0) ScrolldurationMS = 1;
    //const totalDur = ScrolldurationMS + exitAnimDuratinMS;
    let seperationPercent01 = ScrolldurationMS * 0.001;
    if (seperationPercent01 < 0.2) seperationPercent01 = 0.2;
    if (seperationPercent01 > 0.75) seperationPercent01 = 0.75;
    const remainingMarginPercent01 = 1 - seperationPercent01;
    //seperationPoint = totalDur * seperationPercent01;
    //console.log("sep point: " + seperationPercent01);

    let starttime = null;
    let frameCounter = 0;
    requestAnimationFrame(function anim() {
      frameCounter++;
      if (starttime == null) starttime = Date.now();
      //console.log("animation step");
      //console.log(Date.now());
      //console.log(Date.now());
      const totalElapsedMS = Date.now() - starttime;
      const totalProgress01 =
        totalElapsedMS / (ScrolldurationMS + exitAnimDuratinMS);

      const durationThruScroll =
        totalElapsedMS > ScrolldurationMS ? ScrolldurationMS : totalElapsedMS;
      const durationThruExitAnim =
        totalElapsedMS - ScrolldurationMS < 0
          ? 0
          : totalElapsedMS - ScrolldurationMS;

      const barWidth =
        (durationThruScroll / ScrolldurationMS) * seperationPercent01 +
        (durationThruExitAnim / exitAnimDuratinMS) * remainingMarginPercent01;

      //if (frameCounter % 1 == 0) setloadingBarWidthAsync(barWidth);
      //barVal.current = barWidth;
      //setLoadingPercen01(barWidth);
      //console.log("width: " + loadingBarRef.current?.style.width);
      const barStyle = loadingBarRef.current?.style;
      //console.log("style: ");
      //console.log(barStyle.width);
      if (barStyle) {
        loadingBarRef.current.style.width = `${barWidth * 100}%`;
      }

      if (barWidth < 1) {
        requestAnimationFrame(() => {
          //setLoadingPercen01(barWidth);

          anim();
        });
        //setLoadingPercen01(barWidth);
      } else {
        setLoadingPercen01(1.001);
        return;
      }
    });
  }

  function scrollToTop(showloadingBar = false) {
    let manualScrolling = false;
    //console.log("beginning scroll...");
    //const scrollDistToTop = containerRef.current?.scrollTop;
    //setScrollPosAtLoadStart(scrollDistToTop);
    if (!manualScrolling) {
      containerRef.current?.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else {
      startScrollingTowardsTop();
    }
    if (showloadingBar) {
      fillLoadingBar(scrollToTopDelay * 1000, baseTransDur * 1000);
    }
  }
  function startScrollingTowardsTop() {
    let scrollDelayMS = (scrollToTopDelay > 0 ? scrollToTopDelay : 0.2) * 1000;
    setCurrentlyAutoScrolling(true);
    setTimeout(() => {
      setCurrentlyAutoScrolling(false);
    }, scrollDelayMS);
    //console.log("delay when scroll starts (ms): " + scrollDelayMS);
    animateScroll.scrollTo(0, {
      duration: scrollDelayMS,
      delay: 0,
      smooth: true,
      containerId: "scrollable",
    });
    return;

    scrollSmoothlyTo(0);
    return;
    // const container = containerRef.current;
    // if (!container) return;
    // console.log("dist: " + container.scrollTop);

    // let starttime = null;
    // let prevtime = null;

    // // const totalDist = container.scrollTop;
    // // const durationMS = totalDist / 1.75;
    // requestAnimationFrame(function scroll(timestamp) {
    //   if (starttime == null) starttime = timestamp;
    //   if (prevtime == null) prevtime = starttime;

    //   // const elapsed = timestamp - starttime;
    //   // const progressPercent = elapsed / durationMS;
    //   const difference = timestamp - prevtime;
    //   // const differencePercent = difference / durationMS;
    //   // const scrollAmount = differencePercent * totalDist;

    //   if (container.scrollTop > 1) {
    //     const totalScrollLeft = container.scrollTop;
    //     let scrollStep = totalScrollLeft / 10;
    //     if (difference > 0.0) {
    //       scrollStep *= difference;
    //       scrollStep *= 0.0625;
    //       console.log("diff: " + difference);
    //     }
    //     //if (scrollStep > 25) scrollStep = 25;
    //     containerRef.current?.scrollBy({
    //       top: -scrollStep,
    //       left: 0,
    //       behavior: "auto",
    //     });
    //     prevtime = timestamp;
    //     requestAnimationFrame(scroll);
    //   }
    // });
  }

  function scrollSmoothlyTo(targetScrollPos, duration = -1) {
    console.log("start scroll..");
    const container = containerRef.current;
    if (!container) return;
    const distToCover = targetScrollPos - container.scrollTop;
    if (duration == -1) {
      duration = (scrollToTopDelay > 0 ? scrollToTopDelay : 0.2) * 1000;
    }
    // console.log("dist to scroll: " + distToCover);
    //console.log("duration: " + duration);
    let starttime = null;
    const startPos = container.scrollTop;

    // requestAnimationFrame(function scroll(timestamp) {
    //   if (starttime == null) starttime = timestamp;
    //   if (prevtime == null) prevtime = starttime;
    //   const difference = timestamp - prevtime;

    //   if (container.scrollTop > 1) {
    //     let scrollStep = 0;
    //     scrollStep = targetScrollPos - container.scrollTop;
    //     scrollStep /= 8;
    //     if (difference > 0.0) {
    //       scrollStep *= difference;
    //       scrollStep *= 0.0625;
    //       scrollStep *= 2;
    //       //console.log("diff: " + difference);
    //       //if (scrollStep > 10) scrollStep = 10;

    //       containerRef.current?.scrollBy({
    //         top: scrollStep,
    //         left: 0,
    //         behavior: "auto",
    //       });
    //     }
    //     prevtime = timestamp;
    //     requestAnimationFrame(scroll);
    //   }
    // });

    requestAnimationFrame(function scroll(timestamp) {
      if (starttime == null) starttime = timestamp;

      const elapsed = timestamp - starttime;
      const elapsed01 = elapsed / duration;
      // console.log("elapsed01: " + elapsed01);

      if (elapsed01 < 1) {
        const scrollAmount = bezier01(elapsed01) * distToCover;
        //console.log("bezier01: " + bezier01(elapsed01));

        const scrollKeyframe = startPos + scrollAmount;

        container.scrollTo({
          top: scrollKeyframe,
          //left: 0,
          //behavior: "instant",
        });
        requestAnimationFrame(scroll);
      }
    });

    container.scrollTo({
      top: startPos + distToCover,
      //left: 0,
      // behavior: "instant",
    });
  }

  function bezier01(t) {
    return t * t * (3 - 2 * t);
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
  function resetInput(scrollToTheTop = false) {
    setShowResults(false);
    setAttemptCalculate(false);
    if (scrollToTheTop) {
      scrollToTop();
    }
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

  async function getCurrencies(justRates = false) {
    if (justRates) {
      const rates = await getCurrencyRatesObject();
      setCurrencyRatesObj(rates);
      setcurAPITimestamp(Date.now());
    }
    if (currencyObject != null && currencyRatesObj != null) return; // If these are already set, then there's no need to fetch from api again

    const [currencies, rates] = await Promise.all([
      getCurrenciesObject(),
      getCurrencyRatesObject(),
    ]);
    setcurrencyObject(currencies);
    setCurrencyRatesObj(rates);
    setcurAPITimestamp(Date.now());
  }
}
export default Layout;
