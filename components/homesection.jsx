import { useState } from "react";
import styles from "../styles/homesection.module.css";

const HomeSection = ({}) => {
  return (
    <div className={styles.container}>
      <h3>
        To use this app, start by selecting a mini-tool from the list of
        available options. Have a splendid day! :D
      </h3>
      <h3>
        <button>Select Mini-Tool</button>
      </h3>
    </div>
  );
};
export default HomeSection;
