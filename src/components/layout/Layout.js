import React from "react";
import { StyledContainer } from "../StyledComponents";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import ContactButtons from "../ContactButtons";
import EventAnnouncementBar from "./EventAnnoucementBar";

const Layout = ({ children, onLogout }) => {
  return (
    <>
      <AppNavbar onLogout={onLogout} />
      <EventAnnouncementBar />
      <StyledContainer>{children}</StyledContainer>
      <Footer />

      {/* Messenger chat (Page ID required) */}
      <ContactButtons pageUsername="alantanczy" phone="+48666617974" />
    </>
  );
};

export default Layout;
