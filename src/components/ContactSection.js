import React from "react";
import { StyledContainer, StyledTitle } from "./StyledComponents";
import { Row, Col } from "react-bootstrap";
import MapEmbed from "./MapEmbed";
import styled from "styled-components";
import SocialLinks from "./SocialLinks";

const ContactSection = () => {
  const ContactInfo = styled.div`
    font-size: 1rem;
    line-height: 1.6;
    background-color: ${({ theme }) => theme.colors.cardBackground};
    padding: 30px;
    border-radius: 50px;
  `;
  return (
    <StyledContainer className="mb-0 mt-0" fluid>
      <Row>
        <Col md={9}>
          <MapEmbed />
        </Col>

        <Col md={3} className="d-flex flex-column justify-content-center">
          <ContactInfo>
            <br />
            Budynek Jubilatu
            <br />
            ul.Ofiar Katynia 37
            <br />
            37-450 Stalowa Wola
            <br />
            <br />
            <strong>Telefon:</strong>
            <br />
            666 617 974
            <br />
            <br />
            <strong>Email:</strong>
            <br />
            kontakt@symbiostw.pl
            <SocialLinks
              facebookUrl="https://www.facebook.com/alantanczy"
              instagramUrl="https://www.instagram.com/symbiostw/"
              tiktokUrl={"https://www.tiktok.com/@symbiostw"}
            />
          </ContactInfo>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default ContactSection;
