import { useState } from "react";
import styles from "../styles/homesection.module.css";

const HomeSection = ({ setOpenNav }) => {
  return (
    <div className={styles.container}>
      <h4>
        This app is a collection of small numerical mini-tools and calculators
        for various purposes. To use this app, start by selecting a mini-tool
        from the list of available options. Have a splendid day! :D
      </h4>
      <h3>
        <button
          className={styles.chooseToolButton}
          onClick={() => {
            setOpenNav(true);
          }}
        >
          Select Mini-Tool
        </button>
      </h3>
    </div>
  );
};
export default HomeSection;
