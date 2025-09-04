import React from "react";
import { Modal, Spinner, Button, Image, Alert } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { fetchLocationById } from "../services/locationService";
import { StyledModal, StyledButton } from "./StyledComponents";
const LocationDetailsModal = ({ show, onHide, locationId, location }) => {
  const {
    data: fetchedLocation,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["location", locationId],
    queryFn: () => fetchLocationById(locationId),
    enabled: !!locationId && show && !location,
    staleTime: 300000,
  });

  const finalLocation = location || fetchedLocation;

  if (isLoading && !location) {
    return (
      <StyledModal show={show} onHide={onHide} centered>
        <Modal.Body className="text-center">
          <Spinner animation="border" />
          <p>Loading location details...</p>
        </Modal.Body>
      </StyledModal>
    );
  }

  if (error) {
    return (
      <StyledModal show={show} onHide={onHide} centered>
        <Modal.Body className="text-center">
          <Alert variant="danger">Failed to load location details.</Alert>
        </Modal.Body>
      </StyledModal>
    );
  }

  return (
    <StyledModal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{finalLocation?.name || "Location Details"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {finalLocation?.imageUrl && (
          <div className="text-center mb-3">
            <Image
              src={`${process.env.REACT_APP_API_URL}/${finalLocation.imageUrl}`}
              alt={finalLocation.name}
              fluid
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>
        )}
        <p>
          <strong>City:</strong> {finalLocation?.city || "N/A"}
        </p>
        <p>
          <strong>Street:</strong> {finalLocation?.street || "N/A"}
        </p>
        <p>{finalLocation?.description || "No description available."}</p>
      </Modal.Body>
      <Modal.Footer>
        <StyledButton variant="secondary" onClick={onHide}>
          Zamknij
        </StyledButton>
      </Modal.Footer>
    </StyledModal>
  );
};

export default LocationDetailsModal;
