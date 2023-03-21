import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/navpanel.module.css";

const NavPanel = ({
  isOpen,
  setIsOpen,
  currentSectionKey,
  setSectionKey,
  numberFromRoute,
}) => {
  const [comingSoonWarning, setComingSoonWarning] = useState(false);
  const [dummyVar, setDummyVar] = useState(false);
  const badge = useRef();

  // This prevents the nav panel opening with the warning badge visible
  useEffect(() => {
    cancelAnim();
  }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        // Dark tinted transparent overlay covers entire viewport and allows a user to close the nav panel by clicking anywhere outside it
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
            // Without this, clicking anywhere inside the nav panel would also register on the overlay behind it,
            // therefore closing the nav panel prematurely
            e.stopPropagation();
          }}
          key={"panel"}
          initial={{ x: "100%" }}
          animate={{ x: "0%" }}
          exit={{
            x: "100%",
            transition: { duration: 0.7, ease: [0.3, 1, 0.4, 1] },
          }}
          transition={{ duration: 0.5, ease: [0.3, 1, 0.4, 1] }}
        >
          <div className={styles.panel}>
            <MenuSection label={"Menu"}>
              <MenuItem label={"Home"} sectionKey={0} />
              <MenuItem label={"About"} sectionKey={1} />
              <MenuItem
                label={"Decimal to Fraction Converter"}
                sectionKey={2}
              />{" "}
              <MenuItem label={"Base Conversion"} sectionKey={3} />
              <MenuItem label={"Unit Conversion"} sectionKey={4} />
              <MenuItem label={"Currency Exchange"} sectionKey={5} />
              <MenuItem label={"Tip Calculator"} sectionKey={-1} />
            </MenuSection>

            <WarningBadge />

            <div className={styles.messageContainer}>
              <p>
                {`
              Some tools in this list are in development and will be ready to blow you away in the near future! ;) Check back soon to experience new tools and increased functionality. `}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
  function MenuItem(props) {
    const disabled = props.sectionKey == -1;
    return (
      <li>
        <button
          onClick={() => {
            if (props.sectionKey == -1) {
              // Trigger warning badge animation
              ResetAnim();
              return;
            }
            setSectionKey(props.sectionKey);
            console.log("keyy: " + props.sectionKey);
            setIsOpen(false);
          }}
          // Make label text gray if disabled, green if it's the active section, or white otherwise
          className={`${disabled ? styles.disabledButton : ""} ${
            props.sectionKey == numberFromRoute() ? styles.currentMenuItem : ""
          }`}
        >
          <h3>{props.label}</h3>
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
          // Apply css class with animation if variable is true, and then remove that class when the animation is complete
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
        <h5>{props.label}</h5>
        <hr align="right" />
        <ul>{props.children}</ul>
      </div>
    );
  }
  function ResetAnim() {
    cancelAnim();
    setTimeout(() => {
      setComingSoonWarning(true);
    }, 10);
  }
  function cancelAnim() {
    if (!badge.current) {
      return;
    }
    if (!comingSoonWarning) return;

    badge.current.classList.remove(".setWarning");
    badge.current.style.animation = "";
    setComingSoonWarning(false);
  }
};

export default NavPanel;
