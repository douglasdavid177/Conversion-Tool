import { useState } from "react";
import styles from "../../styles/Home.module.css";

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
      //className={styles.inputSection}
      className={`${styles.inputSection} ${styles.mainSection}`}
    >
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
        <label>
          <h3>Decimal value</h3>

          <input
            type="text"
            value={isNaN(Number(dec)) && dec != "." ? "" : dec}
            inputMode="decimal"
            onChange={handleInputDec}
            onBlur={validateInputDec}
            onFocus={reacquireFocus}
          />
        </label>
        <label>
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
    //countDecimalPlacesString(e.target.value);
  }
  function validateInputDec() {
    let result = dec;
    const decplaces = countDecimalPlacesString(result);
    result = parseFloat(result);
    result = Math.abs(result);

    // const decplaces = countDecimalPlacesFloat(result); // Not needed and doesn't account for trailing zeros

    const leftOverDecimal = result - Math.floor(result);
    if (isNaN(leftOverDecimal)) {
      setDecFunc(0);
    } else {
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
  function countDecimalPlacesFloat(value) {
    const str = value.toString().split(".")[1];

    const result = str ? str.length : 0;
    if (result > 0 && result < 15) {
      return result;
    }

    return 0;
  }
  function countDecimalPlacesString(value) {
    const str = value.toString().split(".")[1];
    if (!str) return;
    const numString = str.replace(/\D/g, "");
    const result = str ? str.length : 0;
    console.log("decimal places in string: " + result);
    if (result > 0 && result < 15) {
      return result;
    }

    return 0;
  }
  function reacquireFocus(e) {
    console.log("e:");
    console.log(e.target);
    setTimeout(() => {
      e.target.focus();
    }, 10);
  }
};

export default InputSection;
