import React from "react";
import { Container } from "react-bootstrap";
import SocialLinks from "../SocialLinks"; // Adjust the path as needed

const Footer = () => (
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
          <p>
            Developed by <a href="www.pawelstyczen.com">PAWELSTYCZEN.COM</a>
          </p>
        </div>
      </div>
    </Container>
  </footer>
);

export default Footer;
