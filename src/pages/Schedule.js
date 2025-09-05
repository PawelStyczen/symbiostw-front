import React from "react";
import CalendarView from "../components/CalendarView";
import { StyledTitle, StyledContainer } from "../components/StyledComponents";

const Schedule = () => (
  <StyledContainer style={{ padding: "0rem" }} fluid>
    <StyledTitle className="text-center my-4">GRAFIK</StyledTitle>

    <CalendarView />
  </StyledContainer>
);

export default Schedule;
