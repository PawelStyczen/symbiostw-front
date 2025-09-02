import React from "react";
import { StyledContainer } from "../StyledComponents";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import MessengerChat from "../MessengerChat";

const Layout = ({ children, onLogout }) => {
  return (
    <>
      <AppNavbar onLogout={onLogout} />
      <StyledContainer>{children}</StyledContainer>
      <Footer />

      {/* Messenger chat (Page ID required) */}
      <MessengerChat pageId="101786911599679" />
    </>
  );
};

export default Layout;
