import React from "react";
import PropTypes from "prop-types";

const Tag = ({ type }) => {
  // Define tagss
  const tagStyles = {
    individual: { label: "Indywidualne" }, // Blue
    solo: { label: "Solo" }, // Blue
    // more to add
  };

  // Fallback
  const tag = tagStyles[type] || { label: "Unknown", color: "#6c757d" }; // Gray for unknown

  return (
    <span
      style={{
        display: "inline-block",
        padding: "0.2rem 0.5rem",
        fontSize: "0.8rem",
        fontWeight: "light",
        color: "white",
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(0,0,0,0.7)",

        textTransform: "uppercase",
        marginRight: "0.5rem",
      }}
    >
      {tag.label}
    </span>
  );
};

Tag.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Tag;
