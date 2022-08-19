import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import convert from "convert-units";
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
  useEffect(() => {
    // console.log("howdy...");
    // console.log(convert(1).from("lb").to("kg"));
    // console.log(convert().possibilities());
    // console.log(convert().describe("in3/min"));
  });
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
          <select
            className={styles.limitWidth}
            onChange={handleStartUSelectChange}
            value={startU}
          >
            <option value="default">Select unit</option>

            {getCurrentPossibilities(true).map((unit, ind) => {
              return (
                <option value={unit} key={unit}>
                  {getOptionLabelString(unit, startU)}
                </option>
              );
            })}
          </select>
        </label>

        <label className={`${styles.fullWidth} ${styles.noHighlight}`}>
          <h3>Desired unit</h3>
          <select onChange={handleEndUSelectChange} value={endU}>
            <option value="default">Select unit</option>
            <option value="auto">Auto (chooses best unit)</option>
            {getCurrentPossibilities(false).map((unit, ind) => {
              return (
                <option value={unit} key={unit}>
                  {getOptionLabelString(unit, endU)}
                </option>
              );
            })}
          </select>
        </label>
      </form>
    </motion.div>
  );

  function getCurrentPossibilities(isStartUnit) {
    if (isStartUnit) {
      if (endU == null || endU == "default" || endU == "auto") {
        return convert().possibilities();
      } else {
        return convert().from(endU).possibilities();
      }
    } else {
      if (startU == null || startU == "default") {
        return convert().possibilities();
      } else {
        return convert().from(startU).possibilities();
      }
    }
  }
  function getOptionLabelString(unit, currentSelected) {
    const plural = convert().describe(unit).plural;
    if (unit == "cm2") plural = "Square Centimeters";
    return unit == currentSelected
      ? unit + " (" + plural.toLowerCase() + ")"
      : plural + " (" + unit + ")";
  }
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

  function handleStartUSelectChange(e) {
    const justSelected = e.target.value;
    if (justSelected === "default") {
      setStartUFunc("default");
      setEndUFunc("default");
    } else {
      setStartUFunc(justSelected);
    }
  }
  function handleEndUSelectChange(e) {
    const justSelected = e.target.value;
    if (justSelected === "default") {
      setEndUFunc("default");
      setStartUFunc("default");
    } else {
      setEndUFunc(justSelected);
    }
  }
};
export default InputSection;
