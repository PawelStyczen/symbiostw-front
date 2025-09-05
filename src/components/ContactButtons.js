// ContactButtons.jsx
import React from "react";
import styled from "styled-components";
import { FaFacebookMessenger, FaPhoneAlt } from "react-icons/fa";

const Wrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  gap: 12px;
  z-index: 999;
  flex-direction: row;

  @media (max-width: 480px) {
    flex-direction: column;
    right: 15px;
    bottom: 15px;
  }
`;

const FloatingButton = styled.a`
  background-color: ${({ bgColor }) => bgColor || "#0084ff"};
  color: white;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#006fe0"};
  }
`;

const ContactButtons = ({
  pageUsername = "symbiostw",
  phone = "+48123456789",
}) => {
  return (
    <Wrapper>
      <FloatingButton
        href={`https://m.me/${pageUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Napisz do nas na Messengerze"
        bgColor="#0084ff"
        hoverColor="#006fe0"
      >
        <FaFacebookMessenger size={28} />
      </FloatingButton>

      <FloatingButton
        href={`tel:${phone}`}
        title="Zadzwoń do nas"
        bgColor="#4CAF50"
        hoverColor="#3e8e41"
      >
        <FaPhoneAlt size={20} />
      </FloatingButton>
    </Wrapper>
  );
};

export default ContactButtons;
