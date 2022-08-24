import { useState } from "react";
import styles from "../../styles/mainsection.module.css";

const InputSection = ({
  dec,
  den,
  setDecFunc,
  setDenFunc,
  triggerW,
  setTriggerFunc,
  setDecPlacesFunc,
}) => {
  return (
    <div
      className={`${styles.decFracInput} ${styles.inputSection} ${styles.mainSection}`}
    >
      {/*This heading has an animation attached that fades from red back to grey, 
      and is triggered by the triggerW prop when action button is pressed without input*/}
      <h4
        className={triggerW ? styles.warning : {}}
        onAnimationEnd={() => {
          setTriggerFunc(false);
        }}
      >
        Enter the decimal you want converted, and the denominator of the
        fraction you want it converted to.
      </h4>
      <form className={styles.inputFields} key="myform">
        <label className={styles.small}>
          <h3>Decimal value</h3>
          {/*This input field tries to display the state variable (a string) but will display nothing unless the value is either 
          a valid number or a decimal point.
          The value is then immediately set to that same state variable again therefore resetting its value to an empty string 
          when the number becomes invalid. 
          This ensures the user can't enter anything but a valid number while still keeping the variable type a string*/}
          <input
            type="text"
            value={isNaN(Number(dec)) && dec != "." ? "" : dec}
            inputMode="decimal"
            onChange={handleInputDec}
            onBlur={validateInputDec}
            onFocus={reacquireFocus}
          />
        </label>

        <label className={styles.small}>
          <h3>Fraction denominator</h3>
          <input
            type="text"
            inputMode="decimal"
            value={isNaN(den) ? "" : den}
            onChange={handleInputDen}
            onBlur={validateInputDen}
            onFocus={reacquireFocus}
          />
        </label>
      </form>
    </div>
  );
  function handleInputDec(e) {
    e.persist();
    setDecFunc(e.target.value);
  }
  function validateInputDec() {
    let result = dec;
    // Count decimal places in string value entered so that the user can choose the decimal precision by adding trailing zeros if they desire
    const decplaces = countDecimalPlacesString(result);
    result = parseFloat(result);
    // Negative numbers arent valid so just make them positive.
    result = Math.abs(result);

    // The leftover decimal is the final result value once corrected becuase any number to the left of the decimal point is ignored
    const leftOverDecimal = result - Math.floor(result);

    if (isNaN(leftOverDecimal)) {
      setDecFunc(0);
    } else {
      // Set the state variable to the number equivalent of its string
      setDecFunc(
        Number(leftOverDecimal).toFixed(decplaces > 2 ? decplaces : 2)
      );
      setDecPlacesFunc(decplaces > 2 ? decplaces : 2);
    }
  }
  function handleInputDen(e) {
    let result = e.target.value;
    setDenFunc(result);
  }
  function validateInputDen() {
    let result = den;
    result = parseInt(result);
    result = Math.abs(result);

    if (isNaN(result)) {
      setDenFunc(0);
    } else {
      setDenFunc(result);
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
