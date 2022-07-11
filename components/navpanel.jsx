import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import styles from "../styles/navpanel.module.css";

const NavPanel = ({ isOpen, setIsOpen, setSectionKey }) => {
  const [comingSoonWarning, setComingSoonWarning] = useState(false);
  const badge = useRef();
  const keyFrames = [0];
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
            <h5>Tools</h5>
            <hr align="right" />
            <ul>
              <li>
                <button
                  onClick={() => {
                    setSectionKey(0);
                    setIsOpen(false);
                  }}
                >
                  <h2 className={styles.homeLink}>Home</h2>
                </button>
                <div
                  className={styles.bulletPoint}
                  style={{ background: "transparent" }}
                ></div>
              </li>
              <MenuItem
                label={"Decimal to Fraction Converter"}
                sectionKey={1}
              />
              <MenuItem label={"Unit Conversion"} sectionKey={-1} />
              <MenuItem label={"Tip Calculator"} sectionKey={-1} />
            </ul>

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
              badge.current.classList.remove(".setWarning");
              badge.current.style.animation = "none";

              void badge.current.offsetWidth;
              console.log("badge width");
              console.log(badge.current.offsetWidth);
              badge.current.style.animation = "";
              setComingSoonWarning(true);
              // setTimeout(() => {
              //   setComingSoonWarning(false);
              // }, 500);
              console.log("at least we in here");
              return;
            }
            setSectionKey(props.sectionKey);
            setIsOpen(false);
          }}
          // disabled={props.sectionKey == -1}
          className={props.sectionKey == -1 ? styles.disabledButton : ""}
        >
          <h2>{props.label}</h2>
        </button>
        <div className={styles.bulletPoint}></div>
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
};

export default NavPanel;
