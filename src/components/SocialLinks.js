import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6"; // ✅ TikTok icon
import styled from "styled-components";

const SocialWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const IconLink = styled.a`
  color: ${({ theme }) => theme.colors.primary || "#333"};
  font-size: 1.8rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.highlight || "#007bff"};
  }
`;

const SocialLinks = ({ facebookUrl, instagramUrl, tiktokUrl }) => {
  return (
    <SocialWrapper>
      {facebookUrl && (
        <IconLink href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </IconLink>
      )}
      {instagramUrl && (
        <IconLink href={instagramUrl} target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </IconLink>
      )}
      {tiktokUrl && (
        <IconLink href={tiktokUrl} target="_blank" rel="noopener noreferrer">
          <FaTiktok />
        </IconLink>
      )}
    </SocialWrapper>
  );
};

export default SocialLinks;
