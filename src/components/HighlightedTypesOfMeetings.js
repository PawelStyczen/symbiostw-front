import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Alert } from "react-bootstrap";
import { fetchHighlightedTypesOfMeetings } from "../services/typeOfMeetingService";
import {
  StyledCard,
  StyledButton,
  StyledTitle,
  StyledLink,
  StyledCardImg,
} from "../components/StyledComponents";
import StyledCarousel from "../components/StyledCarousel";
import styled from "styled-components";
import {
  SCHEDULE_PATH,
  getTypeOfMeetingPath,
  TYPE_OF_MEETINGS_PATH,
} from "../utils/contentRoutes";

const Description = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 4.5em;
`;
const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  flex-wrap: wrap;
`;

const HighlightedTypesOfMeetings = () => {
  const navigate = useNavigate();

  const [typesOfMeetings, setTypesOfMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTypesOfMeetings = async () => {
      try {
        const data = await fetchHighlightedTypesOfMeetings();
        setTypesOfMeetings(data);
      } catch (err) {
        setError("Failed to load highlighted types of meetings.");
      } finally {
        setLoading(false);
      }
    };
    loadTypesOfMeetings();
  }, []);

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto my-5" />;
  if (error)
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  //TODO co jak brak higlightow
  return (
    <div className="container mt-5">
      <StyledTitle className="text-center mb-4">
        Sprawdź naszą ofertę
      </StyledTitle>

      <StyledCarousel slidesToShow={1}>
        {typesOfMeetings.map((type) => (
          <div key={type.id} style={{ margin: "0 10px" }}>
            <StyledCard $horizontal $height="400px">
              {type.imageUrl && (
                <StyledCardImg
                  src={`${process.env.REACT_APP_API_URL}/${type.imageUrl}`}
                  alt={type.name}
                  $imgWidth={window.innerWidth < 768 ? "50%" : "70%"}
                />
              )}
              <StyledCard.Body>
                <StyledCard.Title>{type.name}</StyledCard.Title>
                <Description>{type.shortDescription}</Description>
                <ButtonRow>
                  <StyledButton
                    style={{
                      marginBottom: window.innerWidth < 768 ? "1rem" : "0",
                    }}
                    variant="secondary"
                    onClick={() =>
                      navigate(SCHEDULE_PATH, { state: { type: type.name } })
                    }
                  >
                    Znajdź spotkania
                  </StyledButton>
                  <StyledButton
                    $align="end"
                    onClick={() => navigate(getTypeOfMeetingPath(type))}
                  >
                    Szczegóły
                  </StyledButton>
                </ButtonRow>
              </StyledCard.Body>
            </StyledCard>
          </div>
        ))}
      </StyledCarousel>

      <StyledLink to={TYPE_OF_MEETINGS_PATH} align="right">
        Cała oferta
      </StyledLink>
    </div>
  );
};

export default HighlightedTypesOfMeetings;
