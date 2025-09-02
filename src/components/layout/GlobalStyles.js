import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) =>
      theme.colors.background};  // Background based on theme
    color: ${({ theme }) =>
      theme.colors.textColor};  // Text color based on theme
    transition: background-color 0.3s ease;
  }

  .modal-content {
    background-color: ${({ theme }) => theme.colors.modalBackground};
  }

  .btn-primary {
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
  }

  .card {
    background-color: ${({ theme }) => theme.colors.cardBackground};
    color: ${({ theme }) => theme.colors.textColor};
    border: 1px solid ${({ theme }) => theme.colors.secondary};
  }
  
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) =>
      theme.colors.textColor};  // Lighter font for headers
  }

  a {
    color: ${({ theme }) =>
      theme.colors.primary};  // Links styled by primary color
    &:hover {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
`;
