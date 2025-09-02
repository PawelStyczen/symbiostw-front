import React from "react";
import CalendarView from "../components/CalendarView";
import { StyledTitle, StyledContainer } from "../components/StyledComponents";

const Schedule = () => (
  <StyledContainer className="mb-5" fluid>
    <StyledTitle className="text-center my-4">GRAFIK</StyledTitle>

    <CalendarView />
  </StyledContainer>
);

export default Schedule;
