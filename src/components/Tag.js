import React from "react";
import PropTypes from "prop-types";
const tagStyles = {
  individual: {
    label: "Indywidualne",
    bg: "#1E88E5", // blue
  },
  solo: {
    label: "Solo",
    bg: "#6A1B9A", // purple
  },
  event: {
    label: "Wydarzenie",
    bg: "#C62828", // red
  },
};

const isMobile = window.innerWidth <= 768;
const Tag = ({ type }) => {
  // Define tagss
  const tag = tagStyles[type] || {
    label: "Unknown",
    bg: "#6c757d",
  };

  return (
    <span
      style={{
        display: "inline-block",
        padding: isMobile ? "0.15rem 0.25rem" : "0.2rem 0.3rem",
        borderRadius: "25px",
        fontSize: isMobile ? "0.35rem" : "0.6rem",
        fontWeight: "bold",
        color: "white",
        backdropFilter: "blur(4px)",
        backgroundColor: tag.bg, // ✅ KLUCZOWE

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
