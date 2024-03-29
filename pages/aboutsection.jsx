// import { useState } from "react";
import styles from "../styles/homesection.module.css";
import convert from "convert-units";
import Link from "next/link";

const AboutSection = ({ setOpenNav }) => {
  const amountOfMeasurementTypes = convert().measures().length;
  const amountOfUnits = convert().possibilities().length;
  return (
    <div className={styles.aboutSection}>
      <p>
        <br />
        {`
        This app is a single page web application (SPA), written in JavaScript and built with the NextJS framework. It uses
        ReactJS for frontend architecture, controlling state management, data
        binding, events, and application lifecycle with NextJS handling the routing structure. CSS modules are used to apply styling, and animations were written using Framer Motion
        API. The app consists of various mathemaical tools, as described below: `}
        <br />
        <br />
      </p>
      <p>
        The{" "}
        <Link
          href="/decfracsection"
          className={styles.chooseToolButton}
          scroll={false}
        >
          decimal to fraction converter
        </Link>
        {` finds a fraction (with a given denominator) that's closest to or equivalent to a given decimal. The results section shows the closest and second closet fractions, allowing a user to see a high/low value pair corresponding to fractions above and below the target value. The results are color coded— showing values in yellow if they are below the target value, green if they are eqivalent, or blue if above. `}
      </p>
      <p>
        The{" "}
        <Link
          href="/baseconversionsection"
          className={styles.chooseToolButton}
          scroll={false}
        >
          number base conversion tool
        </Link>
        {` converts any numerical value between number systems with different base values. In the results section, the larger base is displayed in blue while the smaller base is displayed in yellow. Equivalent values will appear green.`}
      </p>
      <p>
        The{" "}
        <Link
          href="/unitconversionsection"
          className={styles.chooseToolButton}
          scroll={false}
        >
          The unit conversion tool for measurements
        </Link>
        {` calculates equivalent measurements to a given value, using a vast list of ${amountOfUnits} different physical units across ${amountOfMeasurementTypes} domains of measurement. Color coding is used in the results section to suggest that a particular unit within the resulting pair is larger than the other if it is blue, or smaller if yellow. If the two units are the same, they will both appear green.`}
      </p>
      <p>
        The{" "}
        <Link
          href="/currencyexhangesection"
          className={styles.chooseToolButton}
          scroll={false}
        >
          currency exchange tool
        </Link>
        {` converts any amount of currency from one type to an equivalent amount in another, using live exchange rate values that are retrieved in real time for over 160 world currencies. The results section displays the more valuable currency in blue and the less valuable currency yellow. Requires an internet connection. `}
      </p>
      <p>{`The tip calculator (coming soon) helps generate and display convenient tip values based on markers such as nearest percentage or nearest dollar.`}</p>
      <p>
        The{" "}
        <a
          href="https://github.com/douglasdavid177/Conversion-Tool"
          target="_blank"
          rel="noreferrer"
        >
          source code
        </a>{" "}
        for this project can be viewed online on GitHub.
      </p>
      <br />
      <br />
    </div>
  );
};

export default AboutSection;
