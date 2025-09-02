import React from "react";
import zapisyImg from "../assets/images/zapisy.svg";
import cozabracImg from "../assets/images/cozabrac.svg";
import platnoscImg from "../assets/images/platnosc.svg";
import paraaImg from "../assets/images/paraa.svg";
import { useEffect } from "react";

import {
  StyledButton,
  StyledTitle,
  StyledContainer,
  StyledSubTitle,
  StyledText,
} from "../components/StyledComponents";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewHere = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#C5D1CA";

    return () => {
      document.body.style.backgroundColor = ""; // Reset on unmount
    };
  }, []);

  const Image = styled.img`
    width: 400px;
    height: 400px;
    object-fit: contain;
  `;

  const Title = styled.h1`
    font-family: "Sisterhood", cursive;
    margin-top: 150px;
    text-align: center !important;
    span {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 700;
    }
  `;

  return (
    <StyledContainer>
      <Title>
        {" "}
        Pierwszy raz w <span>symbio</span>?
      </Title>

      <Row className="text-center">
        <Col md={3} className="mb-4 d-flex flex-column align-items-center">
          <Image src={zapisyImg} alt="Jak się zapisać?" />
          <StyledText>JAK SIĘ ZAPISAĆ</StyledText>
          <div className="text-start" style={{ maxWidth: "250px" }}>
            <ul>
              <li>
                W Grafiku znajdź interesującą Cię grupę:{" "}
                <Link to="/schedule">Grafik</Link>
              </li>
              <li>
                Obecnie Zapisy prowadzimy mailowo lub telefonicznie. Napisz do
                nas lub zadzwoń.
              </li>
              <li>
                Możesz też zapisać się przez wiadomość na naszym Facebooku.
              </li>
            </ul>
          </div>
        </Col>

        <Col md={3} className="mb-4 d-flex flex-column align-items-center">
          <Image src={paraaImg} alt="Nie masz pary?" />
          <StyledText>NIE MASZ PARY?</StyledText>
          <p style={{ maxWidth: "250px" }}>
            To nie problem! Jeśli chcesz dołączyć do zajęć w parach, napisz do
            nas. Staramy się znaleźć partnera lub rotujemy w grupie.
          </p>
        </Col>

        <Col md={3} className="mb-4 d-flex flex-column align-items-center">
          <Image src={cozabracImg} alt="Co zabrać?" />
          <StyledText>CO ZABRAĆ ZE SOBĄ NA PIERWSZE ZAJĘCIA?</StyledText>
          <p style={{ maxWidth: "250px" }}>
            Wygodne buty, strój i butelkę wody. Nie trzeba przychodzić w butach
            ślubnych – na to przyjdzie czas później.
          </p>
        </Col>

        <Col md={3} className="mb-4 d-flex flex-column align-items-center">
          <Image src={platnoscImg} alt="Płatności" />
          <StyledText>PŁATNOŚCI</StyledText>
          <p style={{ maxWidth: "250px" }}>Płatność gotówką na miejscu.</p>
        </Col>
      </Row>
    </StyledContainer>
  );
};

export default NewHere;
