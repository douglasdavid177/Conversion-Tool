import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/mainsection.module.css";

const InputSection = ({
  startNum,
  startU,
  endU,
  setStartNumFunc,
  setStartUFunc,
  setEndUFunc,
  triggerW,
  setTriggerFunc,
  setDecPlacesFunc,
}) => {
  return (
    <motion.div className={`${styles.inputSection} ${styles.mainSection}`}>
      <h4
        className={triggerW ? styles.warning : {}}
        onAnimationEnd={() => {
          setTriggerFunc(false);
        }}
      >
        Enter your starting measurement value and its unit type, then select
        your desired unit type.
      </h4>
      <form
        className={`${styles.inputFields} ${styles.wrapChildren}`}
        key="myform"
      >
        <label>
          <h3>Given value</h3>
          <input
            type="text"
            value={isNaN(Number(startNum)) && startNum != "." ? "" : startNum}
            inputMode="decimal"
            onChange={handleInputDec}
            onBlur={validateInputDec}
          />
        </label>

        <label className={styles.noHighlight}>
          <h3>Given unit</h3>
          <select>
            <option value="default">Select unit</option>
            <option value="cm">Centimeter (cm)</option>
            <option value="in">Inches</option>
            <option value="ft">Feet</option>
          </select>
        </label>

        <label className={`${styles.fullWidth} ${styles.noHighlight}`}>
          <h3>Desired unit</h3>
          <select>
            <option value="default">Select unit</option>
            <option value="cm">Centimeters</option>
            <option value="in">Inches</option>
            <option value="ft">Feet</option>
          </select>
        </label>
      </form>
    </motion.div>
  );
  function handleInputDec(e) {
    e.persist();
    setStartNumFunc(e.target.value);
    //countDecimalPlacesString(e.target.value);
  }
  function validateInputDec() {
    let result = startNum;
    const decplaces = countDecimalPlacesString(result);
    result = parseFloat(result);
    result = Math.abs(result);

    // const decplaces = countDecimalPlacesFloat(result); // Not needed and doesn't account for trailing zeros

    if (isNaN(result)) {
      setStartNumFunc(0);
    } else {
      setStartNumFunc(Number(result).toFixed(decplaces > 2 ? decplaces : 2));
      setDecPlacesFunc(decplaces > 2 ? decplaces : 2);
    }
  }
  function countDecimalPlacesString(value) {
    const str = value.toString().split(".")[1];
    if (!str) return 2;
    const numString = str.replace(/\D/g, "");
    const result = str ? str.length : 0;
    // console.log("decimal places in string: " + result);
    if (result > 0 && result < 16) {
      return result;
    }

    return 2;
  }
};
export default InputSection;
