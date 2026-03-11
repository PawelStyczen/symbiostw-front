// src/components/Tag.js
import React from "react";
import PropTypes from "prop-types";
import Badge from "./Badge";

export const tagConfig = {
  individual: {
    label: "Indywidualne",
    bg: "#1E88E5",
    fg: "#FFFFFF",
  },
  solo: {
    label: "Solo",
    bg: "#6A1B9A",
    fg: "#FFFFFF",
  },
  event: {
    label: "Wydarzenie",
    bg: "#C62828",
    fg: "#FFFFFF",
  },
};

export const getTagBadgeProps = (type) =>
  tagConfig[type] || {
    label: "Unknown",
    bg: "#6C757D",
    fg: "#FFFFFF",
  };

const Tag = ({ type, size = "md", overrideLabel, className }) => {
  const { label, bg, fg } = getTagBadgeProps(type);

  return (
    <Badge
      label={overrideLabel || label}
      bg={bg}
      fg={fg}
      size={size}
      className={className}
    />
  );
};

Tag.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["sm", "md"]),
  overrideLabel: PropTypes.string,
  className: PropTypes.string,
};

export default Tag;
