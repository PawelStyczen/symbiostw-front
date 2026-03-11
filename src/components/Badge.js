// src/components/Badge.js
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: ${({ $size }) =>
    $size === "sm" ? "0.1rem 0.35rem" : "0.3rem 0.75rem"};
  border-radius: 999px;
  font-size: ${({ $size }) => ($size === "sm" ? "0.55rem" : "0.85rem")};
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;

  background-color: ${({ $bg }) => $bg};
  color: ${({ $fg }) => $fg};
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

const Badge = ({ label, bg, fg, size = "md", className, title }) => {
  return (
    <StyledBadge
      $size={size}
      $bg={bg}
      $fg={fg}
      className={className}
      title={title || label}
    >
      {label}
    </StyledBadge>
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  bg: PropTypes.string.isRequired,
  fg: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md"]),
  className: PropTypes.string,
  title: PropTypes.string,
};

Badge.defaultProps = {
  fg: "#FFFFFF",
  size: "md",
};

export default Badge;
