import { useState } from "react";
import styles from "../styles/Home.module.css";

const InputSection = ({
  dec,
  den,
  setDecFunc,
  setDenFunc,
  triggerW,
  setTriggerFunc,
}) => {
  return (
    <div className={styles.inputSection}>
      <h5
        className={triggerW ? styles.warning : {}}
        onAnimationEnd={() => {
          setTriggerFunc(false);
        }}
      >
        Please enter the decimal you want converted, and the denominator of the
        fraction you want it converted to.
      </h5>
      <form className={styles.inputFields} key="myform">
        <label>
          <h3>Decimal value</h3>

          <input
            type="text"
            value={isNaN(dec) ? "" : dec}
            inputMode="decimal"
            onChange={handleInputDec}
            onBlur={validateInputDec}
          />
        </label>
        <label>
          <h3>Fraction denominator</h3>
          <input
            // key="den"
            // name="den"
            type="text"
            inputMode="decimal"
            value={isNaN(den) ? "" : den}
            onChange={handleInputDen}
            onBlur={validateInputDen}
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
    result = parseFloat(result);
    result = Math.abs(result);

    const leftOverDecimal = result - Math.floor(result);
    console.log(result);
    if (isNaN(leftOverDecimal)) {
      setDecFunc(0);
    } else {
      setDecFunc(leftOverDecimal);
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
    console.log("validated den...");
  }
};

export default InputSection;
