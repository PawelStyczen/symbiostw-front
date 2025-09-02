import { borderRadius } from "polished";
import React from "react";

const MapEmbed = ({
  src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5068.682698110532!2d22.038835593579112!3d50.56501760000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722d3b894064df1%3A0x3a0510eaebdb5eb5!2zU3prb8WCYSBUYcWEY2EgU3ltYmlv!5e0!3m2!1spl!2spl!4v1752834160585!5m2!1spl!2spl",
  width = "100%",
  height = "450px",
  zoom = 20,
  style = {
    filter: "sepia(50%) contrast(100%) brightness(80%)",
    borderRadius: "50px",
  },
  className = "",
}) => {
  return (
    <iframe
      src={src}
      width={width}
      height={height}
      style={{ border: 0, ...style }}
      className={className}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Map"
    />
  );
};

export default MapEmbed;
