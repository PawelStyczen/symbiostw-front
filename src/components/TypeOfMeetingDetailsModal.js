import React from "react";
import { Modal, Spinner, Button, Image, Alert } from "react-bootstrap";
import { StyledModal, StyledButton } from "./StyledComponents";
import { useQuery } from "@tanstack/react-query";
import { fetchTypeOfMeetingById } from "../services/typeOfMeetingService";

const TypeOfMeetingDetailsModal = ({
  show,
  onHide,
  typeOfMeetingId,
  typeOfMeeting,
}) => {
  const {
    data: fetchedTypeOfMeeting,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["typeOfMeeting", typeOfMeetingId],
    queryFn: () => fetchTypeOfMeetingById(typeOfMeetingId),
    enabled: !!typeOfMeetingId && show && !typeOfMeeting, // Fetch if no direct data
    staleTime: 300000,
  });

  const finalTypeOfMeeting = typeOfMeeting || fetchedTypeOfMeeting;

  if (isLoading && !typeOfMeeting) {
    return (
      <StyledModal show={show} onHide={onHide} centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" />
          <p>Loading type of meeting details...</p>
        </Modal.Body>
      </StyledModal>
    );
  }

  if (error) {
    return (
      <StyledModal show={show} onHide={onHide} centered>
        <Modal.Body className="text-center">
          <Alert variant="danger">
            Failed to load type of meeting details.
          </Alert>
        </Modal.Body>
      </StyledModal>
    );
  }

  return (
    <StyledModal show={show} onHide={onHide} size="lg" centered scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          {finalTypeOfMeeting?.name || "Type of Meeting Details"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {finalTypeOfMeeting?.imageUrl && (
          <div className="text-center mb-3">
            <Image
              src={`${process.env.REACT_APP_API_URL}/${finalTypeOfMeeting.imageUrl}`}
              alt={finalTypeOfMeeting.name}
              fluid
              style={{
                height: "350px",
                width: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </div>
        )}
        <div className="mb-3">
          <div
            className="wysiwyg-content"
            dangerouslySetInnerHTML={{
              __html:
                finalTypeOfMeeting?.description ||
                "<p>No description provided.</p>",
            }}
            style={{ marginTop: "0.5rem" }}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton variant="secondary" onClick={onHide}>
          Zamknij
        </StyledButton>
      </Modal.Footer>
    </StyledModal>
  );
};

export default TypeOfMeetingDetailsModal;
