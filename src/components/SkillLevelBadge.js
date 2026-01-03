// src/components/SkillLevelBadge.js
import React from "react";
import styled from "styled-components";

/** Map numeric enum -> internal key */
export const levelKey = (level) => {
  if (level === 0) return "beginner";
  if (level === 1) return "intermediate";
  if (level === 2) return "advanced";
  return "none"; // null/undefined => open for all
};

/** Labels (localizable) */
export const levelLabel = {
  none: "Dla wszystkich",
  beginner: "Początkujący",
  intermediate: "Średniozaawansowany",
  advanced: "Zaawansowany",
};

/** Colors per level (tweak to your theme) */
const levelColors = {
  none: { bg: "#ECEFF1", fg: "#37474F" },
  beginner: { bg: "#E0F7FA", fg: "#006064" },
  intermediate: { bg: "#FFF3E0", fg: "#E65100" },
  advanced: { bg: "#F3E5F5", fg: "#4A148C" },
};

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: ${({ $size }) =>
    $size === "sm" ? "0.1rem 0.2rem" : "0.3rem 0.75rem"};
  border-radius: 999px;
  font-size: ${({ $size }) => ($size === "sm" ? "0.55rem" : "0.85rem")};
  font-weight: 600;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const Dot = styled.span`
  width: ${({ $size }) => ($size === "sm" ? "6px" : "8px")};
  height: ${({ $size }) => ($size === "sm" ? "6px" : "8px")};
  border-radius: 50%;
  background-color: currentColor;
  opacity: 0.8;
`;

const SkillLevelBadge = ({
  value,
  size = "md",
  showIcon = true,
  overrideLabel,
}) => {
  const key = levelKey(value);
  const { bg, fg } = levelColors[key];
  const text = overrideLabel || levelLabel[key];
  return (
    <Pill $size={size} $bg={bg} $fg={fg} title={text}>
      {text}
    </Pill>
  );
};

export default SkillLevelBadge;

/** Optional: plain helpers if you ever need just text */
export const getLevelLabel = (value) => levelLabel[levelKey(value)];
