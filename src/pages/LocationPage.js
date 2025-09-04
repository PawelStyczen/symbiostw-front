import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  StyledCard,
  StyledButton,
  StyledTitle,
  StyledContainer,
} from "../components/StyledComponents";
import { fetchLocations } from "../services/locationService";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import LocationDetailsModal from "../components/LocationDetailsModal";
import { useAlert } from "../components/AlertContext";

const LocationPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { showAlert } = useAlert();

  const {
    data: locations = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["locations"],
    queryFn: fetchLocations,
    staleTime: 300000,
  });

  const handleViewDetails = (location) => {
    setSelectedLocation(location);
  };

  const handleCloseModal = () => {
    setSelectedLocation(null);
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading locations...</p>
      </div>
    );
  }

  if (isError) {
    showAlert(error.message || "Failed to load locations.", "danger");
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">
          Failed to load locations. Please try again.
        </Alert>
      </Container>
    );
  }

  return (
    <StyledContainer>
      <StyledTitle>Lokacje</StyledTitle>
      {locations.length > 0 ? (
        <Row>
          {locations.map((location) => (
            <Col key={location.id} md={4} className="mb-4">
              <StyledCard className="shadow-sm">
                {location.imageUrl && (
                  <StyledCard.Img
                    variant="top"
                    src={`${process.env.REACT_APP_API_URL}/${location.imageUrl}`}
                    alt={location.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <StyledCard.Body>
                  <Card.Title>{location.name}</Card.Title>
                  <StyledCard.Text>
                    <strong>City:</strong> {location.city} <br />
                    <strong>Street:</strong> {location.street} <br />
                    {location.description.split(" ")[0]}...
                  </StyledCard.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleViewDetails(location)}
                  >
                    View Details
                  </Button>
                </StyledCard.Body>
              </StyledCard>
            </Col>
          ))}
        </Row>
      ) : (
        <Alert variant="info">No locations found.</Alert>
      )}

      {selectedLocation && (
        <LocationDetailsModal
          show={!!selectedLocation}
          onHide={handleCloseModal}
          location={selectedLocation}
        />
      )}
    </StyledContainer>
  );
};

export default LocationPage;
