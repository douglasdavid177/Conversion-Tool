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
  return (
    <div className={`${styles.inputSection} ${styles.mainSection}`}>
      <p
        className={triggerW ? styles.warning : {}}
        onAnimationEnd={() => {
          setTriggerFunc(false);
        }}
      >
        Enter your starting measurement value and its unit type, then select
        your desired unit type.
      </p>
      <form
        className={`${styles.inputFields} ${styles.wrapChildren}`}
        key="myform"
      >
        <div className={styles.formRow}>
          <label>
            <h3>Given value</h3>
            {/*This input field tries to display the state variable (a string) but will display nothing unless the value is either 
          a valid number or a decimal point.
          The value is then immediately set to that same state variable again therefore resetting its value to an empty string 
          when the number becomes invalid. 
          This ensures the user can't enter anything but a valid number while still keeping the variable type a string*/}
            <input
              type="text"
              value={isNaN(Number(startNum)) && startNum != "." ? "" : startNum}
              inputMode="decimal"
              onChange={handleInputDec}
              onBlur={validateInputDec}
            />
          </label>

          {/*Since clicking the heding doesn't open the select (and can't), don't highlight it despite default behavior*/}
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
        </div>

        <div className={styles.formRow} style={{ marginTop: "0.25rem" }}>
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
        </div>
      </form>
    </div>
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
    //Corrects bug in api that incorrectly displays cm2 as Centimeters by default
    if (unit == "cm2") plural = "Square Centimeters";

    // When a unit type is selected, change its text to display the abbreviated unit first
    // so the most important and necessary information is always on screen first in case space is limited
    return unit == currentSelected
      ? unit + " (" + plural.toLowerCase() + ")"
      : plural + " (" + unit + ")";
  }
  function handleInputDec(e) {
    e.persist();
    setStartNumFunc(e.target.value);
  }
  function validateInputDec() {
    let result = startNum;
    // Count decimal places in string value entered so that the user can choose the decimal precision by adding trailing zeros if they desire
    const decplaces = countDecimalPlacesString(result);
    result = parseFloat(result);
    // Negative values don't make sense, just make them positive
    result = Math.abs(result);

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
    const result = str ? str.length : 0;
    if (result > 0 && result < 16) {
      return result;
    }

    return 2;
  }

  function handleStartUSelectChange(e) {
    const justSelected = e.target.value;
    // If select (default) is manually selected, reset both select inputs so that all possibilities become available
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
