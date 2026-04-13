import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "react-bootstrap";
import SocialLinks from "../SocialLinks";
import {
  COOKIES_POLICY_PATH,
  PRIVACY_POLICY_PATH,
} from "../../utils/contentRoutes";
import { useCookieConsent } from "../CookieConsentProvider";

const FooterLink = styled(Link)`
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.2rem;

  &:hover {
    color: inherit;
    opacity: 0.8;
  }
`;

const CookieSettingsButton = styled.button`
  background: transparent;
  border: 0;
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 0.2rem;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
`;

const Footer = () => {
  const { openPreferences } = useCookieConsent();

  return (
    <footer className="bg-dark text-white text-center py-3">
      <Container>
        <div className="row justify-content-center">
          <div className="col-md-6 text-center mb-2 d-flex flex-column align-items-center gap-0">
            <p style={{ fontFamily: "Sisterhood", fontSize: "2rem" }}>symbio</p>
            <p>kontakt@symbiostw.pl</p>
            <p>666 617 974</p>
            <SocialLinks
              facebookUrl="https://www.facebook.com/alantanczy"
              instagramUrl="https://www.instagram.com/symbiostw/"
            />
          </div>
          <div className="col-md-6 text-center mb-2">
            &copy; {new Date().getFullYear()} Symbio. All rights reserved.
            <p className="mt-3 mb-2 d-flex flex-wrap gap-3 justify-content-center">
              <FooterLink to={PRIVACY_POLICY_PATH}>Polityka prywatności</FooterLink>
              <FooterLink to={COOKIES_POLICY_PATH}>Polityka cookies</FooterLink>
              <CookieSettingsButton type="button" onClick={openPreferences}>
                Ustawienia cookies
              </CookieSettingsButton>
            </p>
            <p>
              Developed by{" "}
              <a href="https://www.pawelstyczen.com">PAWELSTYCZEN.COM</a>
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
