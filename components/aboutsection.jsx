import { useState } from "react";
import styles from "../styles/homesection.module.css";

const AboutSection = ({ setOpenNav }) => {
  return (
    <div>
      <h4>
        {`
        This app is a single page web application (SPA) and was written in JavaScript with the NextJS framework. It uses
        ReactJS for frontend architecture, controlling state management, data
        binding, events, application lifecycle and routing. CSS modules were used to apply styling, and animations were written using Framer Motion
        API. The app consists of various mathemaical tools including: `}
      </h4>
      <h4>{`A decimal to fraction converter, that finds a fraction of a given denominator that's closest to or equivent to a given decimal, `}</h4>
      <h4>{`A unit conversion tool (coming soon), for calculating equivelant measurements using different physical units,`}</h4>
      <h4>{`And a tip calculator (coming soon), which helps generate and display convenient tip values based on markers such as nearest percentage or nearest dollar.`}</h4>
    </div>
  );
};

export default AboutSection;
