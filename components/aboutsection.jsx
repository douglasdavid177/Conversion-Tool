import { useState } from "react";
import styles from "../styles/homesection.module.css";

const AboutSection = ({ setOpenNav }) => {
  return (
    <div className={styles.aboutSection}>
      <h4>
        {`
        This app is a single page web application (SPA), written in JavaScript and built with the NextJS framework. It uses
        ReactJS for frontend architecture, controlling state management, data
        binding, events, application lifecycle and routing. CSS modules are used to apply styling, and animations were written using Framer Motion
        API. The app consists of various mathemaical tools described below: `}
      </h4>
      <h4>{`The decimal to fraction converter finds a fraction (with a given denominator) that's closest to or equivalent to a given decimal. The results page shows the first and second closet fractions, allowing you to see a high/low value pair. The results are color coded-- showing values in yellow if they are below the target value, green if they are eqivalent, or blue if above. `}</h4>
      <h4>{`A unit conversion tool, for calculating equivalent measurements using different physical units,`}</h4>
      <h4>{`And a tip calculator (coming soon), which helps generate and display convenient tip values based on markers such as nearest percentage or nearest dollar.`}</h4>
      <br />
    </div>
  );
};

export default AboutSection;
