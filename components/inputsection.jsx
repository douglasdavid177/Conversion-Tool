import { useState } from "react";
import styles from "../styles/Home.module.css";

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
            value={isNaN(Number(dec)) && dec != "." ? "" : dec}
            inputMode="decimal"
            onChange={handleInputDec}
            onBlur={validateInputDec}
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
    if (isNaN(leftOverDecimal)) {
      setDecFunc(0);
    } else {
      const decplaces = countDecimalPlaces(result);
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
  function countDecimalPlaces(value) {
    const str = value.toString().split(".")[1];

    const result = str ? str.length : 0;
    if (result > 0 && result < 10) {
      return result;
    }

    return 0;
  }
};

export default InputSection;
