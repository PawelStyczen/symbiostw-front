import React from "react";
import CalendarView from "../components/CalendarView";
import { StyledTitle, StyledContainer } from "../components/StyledComponents";
import styled from "styled-components";
import { color } from "framer-motion";

const Attention = styled.div`
  background-color: rgba(255, 235, 59, 0.2);
  color: ${({ theme }) => theme.colors.attentionText};
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  font-size: 0.8rem;
`;

const Schedule = () => (
  <StyledContainer style={{ padding: "0rem" }} fluid>
    <Attention>
      <p>
        UWAGA, niektóre zajęcia odbywają się w innych lokalizacjach:
        <ul>
          <li>
            <b>Szkoła tańca Symbio</b> - ul. Ofiar Katynia 37, Stalowa Wola
          </li>
          <li>
            <b style={{ color: "lightblue" }}>GCK Ulanów</b> - ul. Tadeusza Buli
            3, Ulanów
          </li>
          <li>
            <b style={{ color: "lightgreen" }}>Tarnobrzeg</b> - ul. Sienkiewicza
            38A, Tarnobrzeg
          </li>
        </ul>
        Zapraszamy również do kontaktu w celu umówienia się na zajęcia
        indywidualne lub grupowe w innych terminach niż te widoczne w
        kalendarzu.
        <br />
      </p>
    </Attention>

    <CalendarView />
  </StyledContainer>
);

export default Schedule;
