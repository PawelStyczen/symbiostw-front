import React, { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { sendContactMessage } from "../services/contactService";
import ContactSection from "../components/ContactSection";
import {
  StyledContainer,
  StyledCard,
  StyledButton,
  StyledForm,
  StyledTitle,
  StyledBackground,
} from "../components/StyledComponents";
import styled from "styled-components";

const ContactPage = () => {
  return (
    <StyledContainer className="mt-5 mb-5">
      <StyledTitle className="text-center">Przyjedź do nas</StyledTitle>
      <ContactSection />
    </StyledContainer>
  );
};

export default ContactPage;
