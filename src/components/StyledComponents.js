import styled from "styled-components";
import { Modal, Button, Form, Card, Container, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { hexToRgba } from "../utils/colorUtils";
import { darkenHex } from "../utils/colorUtils";
import { darken } from "polished";

export const StyledContainer = styled(Container)`
  max-width: 1200px;
  margin: auto;
  margin-top: 6rem;
  margin-bottom: 6rem;

  ${({ backgroundColor }) =>
    backgroundColor &&
    `background-color: ${backgroundColor}; padding: 3rem; border-radius: 50px;`}

  @media (max-width: 768px) {
    padding: 0rem;
    margin-top: 3rem;
  }
`;

export const StyledModal = styled(({ wide, ...props }) => (
  <Modal {...props} dialogClassName={wide ? "modal-wide" : ""} />
))`
  .modal-dialog {
    width: 100%;
  }

  .modal-content {
    border-radius: 50px;
    border: none !important;
    background-color: ${({ theme }) =>
      hexToRgba(theme.colors.modalBackground, 0.8)};
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(112, 125, 115, 0.3);
    box-shadow: 0 4px 60px rgba(0, 0, 0, 0.3),
      inset 0 0 10px rgba(255, 255, 255, 0.1);
  }

  .modal-title {
    font-size: 1.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    .modal-dialog {
      max-width: 95%;
    }
  }
`;

export const StyledButton = styled(Button)`
  font-size: 1rem;
  padding: 0.6rem 1.2rem;
  border-radius: 25px;
  margin-top: auto;
  width: auto;
  border: none;
  color: white;
  transition: background-color 0.3s ease, transform 0.2s ease;

  align-self: ${({ $align }) => {
    switch ($align) {
      case "center":
        return "center";
      case "end":
        return "flex-end";
      default:
        return "flex-start";
    }
  }};

  background-color: ${({ theme, variant }) =>
    variant === "secondary" ? theme.colors.secondary : theme.colors.primary};

  &:hover {
    color: white;
    transform: scale(1.05);
    background-color: ${({ theme, variant }) =>
      darken(
        0.09,
        variant === "secondary" ? theme.colors.secondary : theme.colors.primary
      )};
  }
  npm &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const StyledForm = styled(Form)`
  .form-control {
    border: 1px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 6px;
    padding: 0.8rem;
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 4px ${({ theme }) => theme.colors.primary};
    }
  }

  .form-label {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledTabs = styled(Tabs)`
  .nav-tabs {
    background-color: ${({ theme }) => darken(0.5, theme.colors.background)};
  }

  .nav-link {
    color: ${({ theme }) => theme.colors.text};

    border-radius: 30px 30px 0 0;

    transition: background-color 0.3s;

    &.active {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }
  }
`;
// StyledComponents.js or your style file

export const StyledCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  height: ${({ $height }) => $height || "auto"};
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  display: flex;
  flex-direction: ${({ $horizontal }) => ($horizontal ? "row" : "column")};
  border: none !important;
  border-radius: 40px;
  padding: 0rem;
  overflow: hidden;

  .card-body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: ${({ $horizontal }) => ($horizontal ? "2rem" : "1.5rem")};
    justify-content: ${({ $horizontal }) =>
      $horizontal ? "space-between" : "flex-start"};
  }

  .card-title {
    font-size: 1.6rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StyledCardImg = styled(Card.Img)`
  height: ${({ $imgHeight }) => $imgHeight || "100%"};
  width: ${({ $imgWidth }) => $imgWidth || "100%"};
  object-fit: cover;
  flex-shrink: 0;
  border-radius: 0px 0px 0 0;
`;

export const StyledTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

export const StyledSubTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
`;

export const StyledText = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

export const StyledLink = styled(Link)`
  display: flex; /* Ensures flex-based alignment */
  justify-content: ${({ align }) =>
    align === "center"
      ? "center"
      : align === "right"
      ? "flex-end"
      : "flex-start"};
  width: fit-content; /* Keeps the width only as wide as needed */
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  margin-top: 40px;
  margin-left: ${({ align }) =>
    align === "right" ? "auto" : align === "center" ? "auto" : "0"};
  margin-right: ${({ align }) => (align === "center" ? "auto" : "0")};

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
    border-bottom: 2px solid ${({ theme }) => theme.colors.secondary};
  }
`;
