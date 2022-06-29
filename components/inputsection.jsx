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
            value={dec}
            inputMode="decimal"
            onChange={handleInputDec}
          />
        </label>
        <label>
          <h3>Fraction denominator</h3>
          <input
            key="den"
            name="den"
            type="text"
            inputMode="decimal"
            value={den}
            onChange={(e) => {
              let result = e.target.value;
              console.log(result);
              result = Math.abs(result);
              result = parseInt(result);
              setDenFunc(result);
            }}
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

    result = Math.abs(result);
    result = parseFloat(result);
    const leftOverDecimal = result - Math.floor(result);
    console.log(result);
    setDecFunc(leftOverDecimal);
  }
  function validateInputDen(e) {}
};

export default InputSection;
