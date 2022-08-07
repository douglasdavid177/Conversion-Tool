import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/navpanel.module.css";

const NavPanel = ({ isOpen, setIsOpen, currentSectionKey, setSectionKey }) => {
  const [comingSoonWarning, setComingSoonWarning] = useState(false);
  const badge = useRef();
  useEffect(() => {
    cancelAnim();
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.background}
          key={"bg"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={() => {
            if (!isOpen) return;
            setIsOpen(false);
          }}
        ></motion.div>
      )}

      {isOpen && (
        <motion.div
          className={styles.panelBG}
          onClick={(e) => {
            e.stopPropagation();
          }}
          key={"panel"}
          //initial={{ x: "200%" }}
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.7, ease: [0, 1.14, 0.75, 0.98] }}
        >
          <div className={styles.panel}>
            <h5>Menu</h5>
            <hr align="right" />

            <MiniMenuSection label={"All"}>
              <MenuItem label={"Home"} sectionKey={0} />
              <MenuItem label={"About"} sectionKey={1} />
              <MenuItem
                label={"Decimal to Fraction Converter"}
                sectionKey={2}
              />
              <MenuItem label={"Unit Conversion"} sectionKey={3} />
              <MenuItem label={"Tip Calculator"} sectionKey={-1} />
            </MiniMenuSection>

            <WarningBadge />

            <div className={styles.messageContainer}>
              <h4>
                {`
              Many tools in this list are in development and will be ready to blow you away in the near future! ;) Check back soon to experience new tools and increased functionality. `}
              </h4>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  function MenuItem(props) {
    return (
      <li>
        <button
          onClick={() => {
            if (props.sectionKey == -1) {
              ResetAnim();
              return;
            }
            setSectionKey(props.sectionKey);
            setIsOpen(false);
          }}
          // disabled={props.sectionKey == -1}
          className={`${props.sectionKey == -1 ? styles.disabledButton : ""} ${
            props.sectionKey == currentSectionKey ? styles.currentMenuItem : ""
          }`}
        >
          <h3>{props.label}</h3>
        </button>
        <div className={styles.bulletPoint}></div>
      </li>
    );
  }

  function MiniMenuItem(props) {
    return (
      <li>
        <button
          onClick={() => {
            if (props.sectionKey == -1) {
              ResetAnim();
            }
            setSectionKey(props.sectionKey);
            setIsOpen(false);
          }}
          // disabled={props.sectionKey == -1}
          className={props.sectionKey == -1 ? styles.disabledButton : ""}
        >
          <h4>{props.label}</h4>
        </button>
        {/* <div className={styles.bulletPoint}></div> */}
      </li>
    );
  }
  function WarningBadge() {
    return (
      <div className={styles.comingSoonWarning}>
        <h5
          ref={badge}
          className={comingSoonWarning ? styles.setWarning : ""}
          onAnimationEnd={() => {
            setComingSoonWarning(false);
          }}
        >
          Coming soon!
        </h5>
      </div>
    );
  }

  function MenuSection(props) {
    return (
      <div className={styles.menuSection}>
        <h5 className={styles.sectionHeading}>{props.label}</h5>
        <hr align="right" />
        <ul>{props.children}</ul>
      </div>
    );
  }
  function MiniMenuSection(props) {
    return (
      <div className={styles.menuSection}>
        {/* <h5>{props.label}</h5> */}
        <hr align="right" className={styles.miniline} />
        <ul>{props.children}</ul>
      </div>
    );
  }
  function ResetAnim() {
    cancelAnim();
    setTimeout(() => {
      setComingSoonWarning(true);
      void badge.current.offsetWidth;
    }, 10);
  }
  function cancelAnim() {
    if (!badge.current) {
      return;
    }
    setComingSoonWarning(false);
    badge.current.classList.remove(".setWarning");
    void badge.current.offsetWidth;
    badge.current.style.animation = "none";
    void badge.current.offsetWidth;
    badge.current.style.animation = "";
    void badge.current.offsetWidth;
  }
};

export default NavPanel;
