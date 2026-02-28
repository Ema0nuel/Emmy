import React from "react";

const Hero = () => {
  const heroText = {
    heading: "EMMANUEL",
    subHeading: "SUNDAY",
  };

  return (
    <section className="glass-text-wrapper" id="hero">
      <h1 className="glass-text">{heroText.heading}</h1>
      <h2 className="glass-text">{heroText.subHeading}</h2>
    </section>
  );
};

export default Hero;
