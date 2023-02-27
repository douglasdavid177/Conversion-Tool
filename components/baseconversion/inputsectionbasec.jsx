import { useState } from "react";
import styles from "../../styles/mainsection.module.css";

const InputSection = ({
  startB,
  endB,
  startStr,
  setStartStrFunc,
  setStartBFunc,
  setEndBFunc,
  triggerW,
  setTriggerFunc,
  setDecPlacesFunc,
}) => {
  return (
    <div
      className={`${styles.startBFracInput} ${styles.inputSection} ${styles.mainSection}`}
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
        Enter the value you want converted, the base it&apos;s written in, and
        the base you want it converted to. Conversions must be possible and
        bases cannot exceed 36.
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
            <h3>Start Number</h3>
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
          <label className={styles.small}>
            <h3>Start base</h3>
            {/*This input field tries to display the state variable (a string) but will display nothing unless the value is either 
          a valid number or a decimal point.
          The value is then immediately set to that same state variable again therefore resetting its value to an empty string 
          when the number becomes invalid. 
          This ensures the user can't enter anything but a valid number while still keeping the variable type a string*/}
            <input
              type="text"
              value={isNaN(startB) || startB == 0 ? "" : startB}
              inputMode="decimal"
              onChange={handleInputStartB}
              onBlur={validateInputStartB}
              onFocus={reacquireFocus}
            />
          </label>

          <label className={styles.small}>
            <h3>End base</h3>
            <input
              type="text"
              inputMode="decimal"
              value={isNaN(endB) || endB == 0 ? "" : endB}
              onChange={handleInputEndB}
              onBlur={validateInputEndB}
              onFocus={reacquireFocus}
            />
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

  function handleInputStartB(e) {
    let val = e.target.value;
    const regex = /^[0-9]+$/i;
    if (!regex.test(val)) {
      val = "";
    }
    setStartBFunc(val);
  }
  function validateInputStartB() {
    let result = startB;
    result = parseInt(result);
    result = Math.abs(result);

    if (isNaN(result)) {
      setStartBFunc(0);
    } else {
      if (result > 36) result = 36;
      setStartBFunc(result);
    }
  }
  function handleInputEndB(e) {
    let val = e.target.value;
    const regex = /^[0-9]+$/i;
    if (!regex.test(val)) {
      val = "";
    }
    setEndBFunc(val);
  }
  function validateInputEndB() {
    let result = endB;
    result = parseInt(result);
    result = Math.abs(result);

    if (isNaN(result)) {
      setEndBFunc(0);
    } else {
      if (result > 36) result = 36;
      setEndBFunc(result);
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
