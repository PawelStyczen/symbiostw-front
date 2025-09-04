import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { useAuth } from "../AuthProvider";
import { useTheme } from "./ThemeProvider";
import styled from "styled-components";
import { hexToRgba } from "../../utils/colorUtils";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import SocialLinks from "../SocialLinks";

// Glassmorphism + tiny mobile polish
const GlassNavbar = styled(Navbar)`
  background-color: ${({ theme }) =>
    hexToRgba(theme.colors.cardBackground, 0.5)};
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(112, 125, 115, 0.3);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12),
    inset 0 0 10px rgba(255, 255, 255, 0.08);

  .navbar-brand {
    color: #b44f66 !important;
    font-weight: 700;
    font-size: 1.5rem;
    font-family: "Great Vibes", cursive;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .nav-link {
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 0.3rem;
    }
  }

  .nav-link:hover {
    color: ${({ theme }) => theme.colors.secondary} !important;
  }

  @media (max-width: 576px) {
    padding-top: 0.35rem;
    padding-bottom: 0.35rem;
  }
`;

const StyledLogo = styled(Logo)`
  width: 90px;
  height: auto;
  @media (max-width: 576px) {
    width: 72px;
  }
`;

const HeaderSocial = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-left: auto;
  margin-right: 0.5rem;

  @media (min-width: 992px) {
    margin-right: 1rem;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderSocialDrawer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  margin-left: auto;
  margin-right: 0.5rem;

  @media (min-width: 992px) {
    display: none;
  }
`;

const DrawerButton = styled(Button)`
  border-radius: 999px;
  width: auto;
  display: inline-block;
  align-self: flex-start;
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0.35rem 0.75rem;
  }
`;

const AppNavbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavClick = (path) => {
    navigate(path);
    setShowOffcanvas(false); // 👈 Auto-close drawer
  };

  const offId = "main-nav-offcanvas";

  return (
    <GlassNavbar expand="lg" fixed="top">
      <Container>
        <Navbar.Brand
          href="/"
          style={{ fontFamily: "Sisterhood", fontSize: "2rem" }}
        >
          symbio
        </Navbar.Brand>

        <HeaderSocial>
          <SocialLinks
            className="d-none d-lg-inline"
            facebookUrl="https://www.facebook.com/alantanczy"
            instagramUrl="https://www.instagram.com/symbiostw/"
            tiktokUrl={"https://www.tiktok.com/@symbiostw"}
            size={24}
          />
        </HeaderSocial>

        <Navbar.Offcanvas
          id={offId}
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          aria-labelledby={`${offId}-label`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`${offId}-label`}>Menu</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="mx-auto justify-content-center align-items-center">
              <Nav.Link onClick={() => handleNavClick("/HomePage")}>
                Strona Główna
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick("/AboutUsPage")}>
                O Nas
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick("/contact")}>
                Kontakt
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick("/news")}>
                Aktualności
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick("/TypesOfMeetings")}>
                Oferta
              </Nav.Link>
            </Nav>

            <HeaderSocialDrawer>
              <SocialLinks
                className="d-none d-lg-inline"
                facebookUrl="https://www.facebook.com/alantanczy"
                instagramUrl="https://www.instagram.com/symbiostw/"
                tiktokUrl={"https://www.tiktok.com/@symbiostw"}
                size={24}
              />
            </HeaderSocialDrawer>
          </Offcanvas.Body>
        </Navbar.Offcanvas>

        <div className="d-flex gap-2 flex-row flex-lg-row ms-lg-3">
          <DrawerButton variant="primary" onClick={() => navigate("/newhere")}>
            Jestem tu nowy
          </DrawerButton>
          <DrawerButton variant="primary" onClick={() => navigate("/schedule")}>
            Grafik
          </DrawerButton>
        </div>

        <Navbar.Toggle
          aria-controls={offId}
          onClick={() => setShowOffcanvas(true)}
        />
      </Container>
    </GlassNavbar>
  );
};

export default AppNavbar;
