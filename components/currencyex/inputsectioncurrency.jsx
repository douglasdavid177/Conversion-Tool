import { useState } from "react";
import styles from "../../styles/mainsection.module.css";
import { FaChevronDown } from "react-icons/fa";

const InputSection = ({
  fromC,
  toC,
  startStr,
  setStartStrFunc,
  setFromCFunc,
  setToCFunc,
  triggerW,
  setTriggerFunc,
  setDecPlacesFunc,
}) => {
  return (
    <div
      className={`${styles.fromCFracInput} ${styles.inputSection} ${styles.mainSection}`}
    >
      {/*This heading has an animation attached that fades from red back to grey, 
      and is triggered by the triggerW prop when action button is pressed without input*/}
      <p
        className={triggerW ? styles.warning : {}}
        onAnimationEnd={() => {
          setTriggerFunc(false);
        }}
      >
        {/* Enter the value you want converted, the base it&apos;s written in, and
        the base you want it converted to. Bases higher than 36 are not
        supported. Only valid conversions will take place. */}
        Enter the amount of currency you want converted, the currency type
        it&apos;s written in, and the currency type you want it converted to.
      </p>
      <form
        className={`${styles.inputFields} ${styles.wrapChildren}`}
        key="myform"
      >
        <div className={styles.formRow}>
          <label className={styles.large}>
            <h3>Value</h3>
            <input
              type="text"
              //   inputMode="decimal"
              value={startStr}
              onChange={handleInputStartStr}
              onBlur={validateInputStartStr}
              onFocus={reacquireFocus}
            />
          </label>
        </div>

        <div className={styles.formRow} style={{ marginTop: "0.25rem" }}>
          <label className={styles.noHighlight}>
            <h3>From Currency</h3>
            <div className={styles.selectWithArrow}>
              <select
                className={styles.limitWidth}
                //onChange={handleStartUSelectChange}
                //value={startU}
              >
                <option value="default">Select currency</option>
              </select>
              <div className={styles.arrow}>
                <FaChevronDown />
              </div>
            </div>
          </label>

          <label className={styles.noHighlight}>
            <h3>To Currency</h3>
            <div className={styles.selectWithArrow}>
              <select
                className={styles.limitWidth}
                //onChange={handleStartUSelectChange}
                //value={startU}
              >
                <option value="default">Select currency</option>
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

  function handleInputStartStr(e) {
    let val = e.target.value;
    const regex = /^[a-z0-9]+$/i;
    if (!regex.test(val)) {
      val = "";
    }
    val = val.toUpperCase();
    setStartStrFunc(val);
  }

  function validateInputStartStr() {}

  function handleInputfromC(e) {
    let val = e.target.value;
    const regex = /^[0-9]+$/i;
    if (!regex.test(val)) {
      val = "";
    }
    setFromCFunc(val);
  }
  function validateInputfromC() {
    let result = fromC;
    result = parseInt(result);
    result = Math.abs(result);

    if (isNaN(result)) {
      setFromCFunc(0);
    } else {
      if (result > 36) result = 36;
      setFromCFunc(result);
    }
  }
  function handleInputtoC(e) {
    let val = e.target.value;
    const regex = /^[0-9]+$/i;
    if (!regex.test(val)) {
      val = "";
    }
    setToCFunc(val);
  }
  function validateInputtoC() {
    let result = toC;
    result = parseInt(result);
    result = Math.abs(result);

    if (isNaN(result)) {
      setToCFunc(0);
    } else {
      if (result > 36) result = 36;
      setToCFunc(result);
    }
  }

  function countdecimalPlacesString(value) {
    const str = value.toString().split(".")[1];
    if (!str) return 2;
    const result = str ? str.length : 0;
    console.log("decimal places in string: " + result);
    if (result > 0 && result < 16) {
      return result;
    }

    return 2;
  }

  // Just to avoid an occasional bug that would prevent mobile numpad from popping up when clicking input
  function reacquireFocus(e) {
    console.log(e.target);
    setTimeout(() => {
      e.target.focus();
    }, 10);
  }
};

export default InputSection;
