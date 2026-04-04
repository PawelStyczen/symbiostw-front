import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, Image, Spinner } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchTypeOfMeetings } from "../services/typeOfMeetingService";
import {
  StyledButton,
  StyledContainer,
  StyledSubTitle,
  StyledTitle,
} from "../components/StyledComponents";
import Tag from "../components/Tag";
import {
  getTypeOfMeetingSlug,
  SCHEDULE_PATH,
  TYPE_OF_MEETINGS_PATH,
} from "../utils/contentRoutes";

const DetailContainer = styled(StyledContainer)`
  max-width: 900px;
`;

const ActionsRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const TagsRow = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 1.5rem;
  display: inline-block;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const HeroImage = styled(Image)`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  object-position: top;
  border-radius: 40px;
  margin-bottom: 2rem;
`;

const Description = styled.div`
  font-size: 1.05rem;
  line-height: 1.8;
`;

const TypeOfMeetingDetailPage = () => {
  const { slug } = useParams();

  const {
    data: meetingTypes = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["typeOfMeetings"],
    queryFn: fetchTypeOfMeetings,
    staleTime: 300000,
  });

  const meetingType = meetingTypes.find(
    (type) => getTypeOfMeetingSlug(type) === slug
  );

  if (isLoading) {
    return (
      <DetailContainer className="text-center">
        <Spinner animation="border" />
        <p className="mt-3 mb-0">Loading meeting type details...</p>
      </DetailContainer>
    );
  }

  if (isError) {
    return (
      <DetailContainer>
        <Alert variant="danger" className="text-center">
          Failed to load meeting type details.
        </Alert>
      </DetailContainer>
    );
  }

  if (!meetingType) {
    return (
      <DetailContainer>
        <Alert variant="warning" className="text-center">
          Meeting type not found.
        </Alert>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <BackLink to={TYPE_OF_MEETINGS_PATH}>← Wroc do oferty</BackLink>

      <StyledTitle>{meetingType.name}</StyledTitle>

      <TagsRow>
        {meetingType.isIndividual && <Tag type="individual" />}
        {meetingType.isSolo && <Tag type="solo" />}
      </TagsRow>

      {meetingType.shortDescription && (
        <StyledSubTitle>{meetingType.shortDescription}</StyledSubTitle>
      )}

      <ActionsRow>
        <StyledButton
          as={Link}
          to={SCHEDULE_PATH}
          state={{ type: meetingType.name }}
          variant="secondary"
        >
          Znajdz spotkania
        </StyledButton>
      </ActionsRow>

      {meetingType.imageUrl && (
        <HeroImage
          src={`${process.env.REACT_APP_API_URL}/${meetingType.imageUrl}`}
          alt={meetingType.name}
          fluid
        />
      )}

      <Description
        className="wysiwyg-content"
        dangerouslySetInnerHTML={{
          __html: meetingType.description || "<p>No description provided.</p>",
        }}
      />
    </DetailContainer>
  );
};

export default TypeOfMeetingDetailPage;
