import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTypeOfMeetings } from "../services/typeOfMeetingService";
import { Container, Spinner, Alert, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import TypeOfMeetingDetailsModal from "../components/TypeOfMeetingDetailsModal";
import { useNavigate } from "react-router-dom";
import Tag from "../components/Tag";

import {
  StyledButton,
  StyledTitle,
  StyledContainer,
  StyledCard,
  StyledCardImg,
  StyledSubTitle,
} from "../components/StyledComponents";

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: auto;
`;

const TypeOfMeetingPage = () => {
  const navigate = useNavigate();
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [modalShow, setModalShow] = useState(false);

  const {
    data: typeOfMeetings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["typeOfMeetings"],
    queryFn: fetchTypeOfMeetings,
    staleTime: 300000,
  });

  const filteredMeetings = typeOfMeetings.filter(
    (meeting) => meeting.name !== "Indywidualne spotkanie | wolne miejsce"
  );

  const handleOpenModal = (meeting) => {
    setSelectedMeeting(meeting);
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setSelectedMeeting(null);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading meeting types...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="danger" className="text-center mt-5">
        Failed to load meeting types.
      </Alert>
    );
  }

  return (
    <StyledContainer>
      <StyledTitle className="text-center mb-4">Nasza Oferta</StyledTitle>
      <Row>
        {filteredMeetings.length > 0 ? (
          filteredMeetings.map((meeting) => (
            <Col key={meeting.id} md={4} className="mb-4">
              <StyledCard key={meeting.id} $height="600px">
                <div style={{ position: "relative" }}>
                  {/* 🔖 Tags absolutely positioned in top-left */}
                  <div
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      left: "2rem",
                      zIndex: 2,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.25rem",
                    }}
                  >
                    {meeting.isIndividual && <Tag type="individual" />}
                    {meeting.isSolo && <Tag type="solo" />}
                  </div>

                  {/* 🖼️ Image */}
                  <StyledCardImg
                    src={`${process.env.REACT_APP_API_URL}/${meeting.imageUrl}`}
                    alt={meeting.name}
                    className="meeting-img"
                    style={{
                      height: "300px",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>
                <StyledCard.Body className="meeting-details">
                  <StyledSubTitle className="meeting-title">
                    {meeting.name}
                  </StyledSubTitle>

                  <p
                    style={{
                      fontSize: "1rem",
                      fontWeight: "100",
                    }}
                  >
                    {meeting.shortDescription}
                  </p>
                  <ButtonRow>
                    <StyledButton
                      variant="secondary"
                      onClick={() =>
                        navigate("/schedule", { state: { type: meeting.name } })
                      }
                    >
                      Znajdź spotkania
                    </StyledButton>
                    <StyledButton
                      variant="primary"
                      onClick={() => handleOpenModal(meeting)}
                    >
                      Szczegóły
                    </StyledButton>
                  </ButtonRow>
                </StyledCard.Body>
              </StyledCard>
            </Col>
          ))
        ) : (
          <Alert variant="info">No meeting types available.</Alert>
        )}

        {/* Modal */}
        {selectedMeeting && (
          <TypeOfMeetingDetailsModal
            show={modalShow}
            onHide={handleCloseModal}
            typeOfMeeting={selectedMeeting}
          />
        )}
      </Row>
    </StyledContainer>
  );
};

export default TypeOfMeetingPage;
