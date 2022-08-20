// import { useState } from "react";
import styles from "../styles/homesection.module.css";
import convert from "convert-units";

const AboutSection = ({ setOpenNav }) => {
  const amountOfMeasurementTypes = convert().measures().length;
  const amountOfUnits = convert().possibilities().length;
  return (
    <div className={styles.aboutSection}>
      <h4>
        {`
        This app is a single page web application (SPA), written in JavaScript and built with the NextJS framework. It uses
        ReactJS for frontend architecture, controlling state management, data
        binding, events, application lifecycle and routing. CSS modules are used to apply styling, and animations were written using Framer Motion
        API. The app consists of various mathemaical tools described below: `}
        <br />
        <br />
      </h4>
      <h4>{`The decimal to fraction converter finds a fraction (with a given denominator) that's closest to or equivalent to a given decimal. The results page shows the closest and second closet fractions, allowing a user to see a high/low value pair corresponding to fractions above and below the target value. The results are color coded— showing values in yellow if they are below the target value, green if they are eqivalent, or blue if above. `}</h4>
      <h4>{`The unit conversion tool for measurements calculates equivalent measurements to a given value, using a vast list of ${amountOfUnits} different physical units across ${amountOfMeasurementTypes} domains of measurement. Color coding is used in the results section to suggest that a particular unit within the resulting pair is larger than the other if it is blue, or smaller if yellow. If the two units are the same, they will appear green.`}</h4>
      <h4>{`The currency exchange tool (coming soon) converts any amount of currency from one type to an equivalent amount in another, using live exchange rate values that are updated every five minutes. Requires an internet connection. `}</h4>
      <h4>{`The tip calculator (coming soon), helps generate and display convenient tip values based on markers such as nearest percentage or nearest dollar.`}</h4>
      <br />
    </div>
  );
};

export default AboutSection;
