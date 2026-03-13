import React from "react";
import { useLocation } from "react-router-dom";
import { StyledContainer } from "../StyledComponents";
import AppNavbar from "./AppNavbar";
import Footer from "./Footer";
import ContactButtons from "../ContactButtons";
import EventAnnouncementBar from "./EventAnnoucementBar";

const Layout = ({ children, onLogout }) => {
  const location = useLocation();

  const hideAnnouncementBar = location.pathname === "/schedule";

  return (
    <>
      <AppNavbar onLogout={onLogout} />
      {!hideAnnouncementBar && <EventAnnouncementBar />}
      <StyledContainer>{children}</StyledContainer>
      <Footer />
      <ContactButtons pageUsername="alantanczy" phone="+48666617974" />
    </>
  );
};

export default Layout;
