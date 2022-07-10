import { useState } from "react";
import styles from "../styles/homesection.module.css";

const HomeSection = ({ setOpenNav }) => {
  return (
    <div className={styles.container}>
      <h3>
        {/* <img src="../airplanesvg.svg" alt="An SVG of a plane" /> */}
        To use this app, start by selecting a mini-tool from the list of
        available options. Have a splendid day! :D
      </h3>
      <h3>
        <button
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
