import React from "react";
import { useLocation } from "react-router-dom";
import { StyledContainer } from "../StyledComponents";
import AppNavbar from "./AppNavbar";
import CookieConsentBanner from "../CookieConsentBanner";
import Footer from "./Footer";
import ContactButtons from "../ContactButtons";
import EventAnnouncementBar from "./EventAnnoucementBar";
import { SCHEDULE_PATH } from "../../utils/contentRoutes";

const Layout = ({ children, onLogout }) => {
  const location = useLocation();

  const hideAnnouncementBar = location.pathname === SCHEDULE_PATH;

  return (
    <>
      <AppNavbar onLogout={onLogout} />
      {!hideAnnouncementBar && <EventAnnouncementBar />}
      <StyledContainer>{children}</StyledContainer>
      <Footer />
      <CookieConsentBanner />
      <ContactButtons pageUsername="alantanczy" phone="+48666617974" />
    </>
  );
};

export default Layout;
