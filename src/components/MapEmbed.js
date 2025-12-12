import React from "react";

const LOCATION_EMBEDS = {
  // default map – your current Symbio url
  default:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5068.682698110532!2d22.038835593579112!3d50.56501760000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722d3b894064df1%3A0x3a0510eaebdb5eb5!2zU3prb8WCYSBUYcWEY2EgU3ltYmlv!5e0!3m2!1spl!2spl!4v1752834160585!5m2!1spl!2spl",

  Tarnobrzeg:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2533.9841194657724!2d21.682501077017033!3d50.57165937862858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473d4a1d754b16c5%3A0xfa25173a98f1b1db!2sFITNESKA!5e0!3m2!1spl!2spl!4v1765495774599!5m2!1spl!2spl",

  "SP Ulanów":
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2538.23496891221!2d22.271714877013682!3d50.492584484328496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473cd45eba99b609%3A0x36344a83a5425ebd!2sPubliczna%20Szko%C5%82a%20Podstawowa%20W%20Ulanowie!5e0!3m2!1spl!2spl!4v1765496086157!5m2!1spl!2spl",
};

const MapEmbed = ({
  location, // "Tarnobrzeg" | "Ulanow" | undefined
  width = "100%",
  height = "450px",
  style = {
    filter: "sepia(50%) contrast(100%) brightness(80%)",
    borderRadius: "50px",
  },
  className = "",
}) => {
  const src =
    (location && LOCATION_EMBEDS[location]) || LOCATION_EMBEDS.default;

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
