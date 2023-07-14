import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import convert from "convert-units";
import styles from "../../styles/mainsection.module.css";
import { FaChevronDown } from "react-icons/fa";

const InputSection = ({
  measurementType,
  setMeasurementTypeFunc,
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
        {/* Enter your starting measurement value and its unit type, then select
        your desired unit type. */}
        Enter your starting measurement value, its unit type, and your desired
        unit type. The type parameter can be used to filter units.
      </p>
      <form
        className={`${styles.inputFields} ${styles.wrapChildren}`}
        key="myform"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={styles.formRow}>
          {/*Since clicking the heding doesn't open the select (and can't), don't highlight it despite default behavior*/}
          <label className={styles.noHighlight}>
            <h3>Type</h3>
            <div className={styles.selectWithArrow}>
              <select
                className={styles.limitWidthXS}
                onChange={handleMasurementTypeSelectChange}
                value={measurementType}
              >
                <option value="default">Auto (any)</option>

                {getMeasurementDomains().map((mType, ind) => {
                  return (
                    <option value={mType} key={mType}>
                      {getMeasurementTypeString(mType)}
                    </option>
                  );
                })}
              </select>
              <div className={styles.arrow}>
                <FaChevronDown />
              </div>
            </div>
          </label>
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
        </div>

        <div className={styles.formRow} style={{ marginTop: "0.25rem" }}>
          {/*Since clicking the heding doesn't open the select (and can't), don't highlight it despite default behavior*/}
          <label className={styles.noHighlight}>
            <h3>Given unit</h3>
            <div className={styles.selectWithArrow}>
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
              <div className={styles.arrow}>
                <FaChevronDown />
              </div>
            </div>
          </label>
          <label className={` ${styles.noHighlight}`}>
            <h3>Desired unit</h3>
            <div className={styles.selectWithArrow}>
              <select
                onChange={handleEndUSelectChange}
                value={endU}
                className={styles.limitWidth}
              >
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
              <div className={styles.arrow}>
                <FaChevronDown />
              </div>
            </div>
          </label>
        </div>
      </form>
    </div>
  );

  function getMeasurementDomains() {
    const measures = convert().measures();
    return measures;
  }
  function getCurrentPossibilities(isStartUnit) {
    if (measurementType != "default") {
      return convert().possibilities(measurementType);
    }
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
  function getMeasurementTypeString(mType) {
    const text = "" + mType;

    const result = text.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    // console.log(finalResult);
    return finalResult;
  }
  function getOptionLabelString(unit, currentSelected) {
    let plural = convert().describe(unit).plural;
    //Corrects bug in api that incorrectly displays cm2 as Centimeters by default
    if (unit == "cm2") plural = "Square Centimeters";

    // When a unit type is selected, change its text to display the abbreviated unit first
    // so the most important and necessary information is always on screen first in case space is limited
    return unit == currentSelected
      ? unit + " (" + plural.toLowerCase() + ")"
      : plural + " (" + unit + ")";
  }
  function handleInputDec(e) {
    //e.persist();
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
      //setEndUFunc("default");
      if (endU === "default") {
        setMeasurementTypeFunc("default");
      }
    } else {
      setStartUFunc(justSelected);
      setMeasurementTypeFunc(convert().describe(justSelected).measure);
    }
  }
  function handleEndUSelectChange(e) {
    const justSelected = e.target.value;
    if (justSelected === "default") {
      setEndUFunc("default");
      //setStartUFunc("default");
      if (startU === "default") {
        setMeasurementTypeFunc("default");
      }
    } else {
      setEndUFunc(justSelected);
      if (justSelected != "auto")
        setMeasurementTypeFunc(convert().describe(justSelected).measure);
    }
  }
  function handleMasurementTypeSelectChange(e) {
    const justSelected = e.target.value;
    setMeasurementTypeFunc(justSelected);

    if (justSelected == "default") {
      setStartUFunc("default");
      setEndUFunc("default");
      return;
    }
    if (
      startU != "default" &&
      justSelected != convert().describe(startU).measure
    ) {
      setStartUFunc("default");
    }

    if (
      endU != "default" &&
      !(justSelected == convert().describe(endU)?.measure)
    ) {
      setEndUFunc("default");
    }
  }
};
export default InputSection;
