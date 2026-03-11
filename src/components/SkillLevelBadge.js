// src/components/SkillLevelBadge.js
import React from "react";
import Badge from "./Badge";

/** Map numeric enum -> internal key */
export const levelKey = (level) => {
  if (level === 0) return "beginner";
  if (level === 1) return "intermediate";
  if (level === 2) return "advanced";
  return "none"; // null/undefined => open for all
};

/** Labels */
export const levelLabel = {
  none: "Dla wszystkich",
  beginner: "Początkujący",
  intermediate: "Średniozaawansowany",
  advanced: "Zaawansowany",
};

/** Colors per level */
export const levelColors = {
  none: { bg: "#ECEFF1", fg: "#37474F" },
  beginner: { bg: "#E0F7FA", fg: "#006064" },
  intermediate: { bg: "#FFF3E0", fg: "#E65100" },
  advanced: { bg: "#F3E5F5", fg: "#4A148C" },
};

export const getLevelLabel = (value) => levelLabel[levelKey(value)];

export const getLevelBadgeProps = (value) => {
  const key = levelKey(value);
  return {
    label: levelLabel[key],
    ...levelColors[key],
  };
};

const SkillLevelBadge = ({ value, size = "md", overrideLabel, className }) => {
  const { label, bg, fg } = getLevelBadgeProps(value);

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

export default SkillLevelBadge;
