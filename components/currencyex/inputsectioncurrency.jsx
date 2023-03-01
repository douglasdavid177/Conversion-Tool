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
  currencyObjects,
}) => {
  return (
    <div className={`${styles.inputSection} ${styles.mainSection}`}>
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
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className={styles.formRow}>
          <label className={styles.large}>
            <h3>Value</h3>
            <input
              type="text"
              value={isNaN(Number(startStr)) && startStr != "." ? "" : startStr}
              inputMode="decimal"
              onChange={handleInputStartStr}
              onBlur={validateInputStartStr}
              onFocus={reacquireFocus}
            />
          </label>
        </div>

        <div className={styles.formRow} style={{ marginTop: "0.25rem" }}>
          <label className={styles.noHighlight}>
            <h3>From</h3>
            <div className={styles.selectWithArrow}>
              <select
                className={styles.limitWidth}
                //onChange={handleStartUSelectChange}
                //value={startU}
              >
                <option value="default">Select currency</option>
                {createSelectOptions()}
              </select>
              <div className={styles.arrow}>
                <FaChevronDown />
              </div>
            </div>
          </label>

          <label className={styles.noHighlight}>
            <h3>To</h3>
            <div className={styles.selectWithArrow}>
              <select
                className={styles.limitWidth}
                //onChange={handleStartUSelectChange}
                //value={startU}
              >
                <option value="default">Select currency</option>
                {createSelectOptions()}
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

  function createSelectOptions() {
    // if (!currencyObjects) return;
    if (!currencyObjects)
      return (
        <option value={"loading"} key={"loading"}>
          Loading...
        </option>
      );
    const entries = Object.entries(currencyObjects);
    console.log(entries);
    return entries.map((val, ind) => {
      console.log(val[1].currency_name);
      return (
        <option value={val[1]?.currency_code} key={val[1]?.currency_name}>
          {val[1]?.currency_name}
        </option>
      );
    });
  }

  function handleInputStartStr(e) {
    //e.persist();
    let val = e.target.value;
    setStartStrFunc(val);
  }

  function validateInputStartStr() {
    let result = startStr;
    // Count decimal places in string value entered so that the user can choose the decimal precision by adding trailing zeros if they desire
    const decplaces = countDecimalPlacesString(result);
    result = parseFloat(result);
    // Negative values don't make sense, just make them positive
    //result = Math.abs(result);

    if (isNaN(result)) {
      setStartStrFunc(0);
    } else {
      setStartStrFunc(Number(result).toFixed(decplaces > 2 ? decplaces : 2));
      setDecPlacesFunc(decplaces > 2 ? decplaces : 2);
    }
  }

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

  function countDecimalPlacesString(value) {
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
