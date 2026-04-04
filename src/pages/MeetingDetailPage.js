import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, Col, Image, Row, Spinner, Tab } from "react-bootstrap";
import { Link, Navigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchMeetingById } from "../services/meetingService";
import { fetchTypeOfMeetingById } from "../services/typeOfMeetingService";
import { fetchInstructorById } from "../services/instructorService";
import {
  StyledButton,
  StyledContainer,
  StyledTabs,
  StyledTitle,
} from "../components/StyledComponents";
import Tag from "../components/Tag";
import SkillLevelBadge from "../components/SkillLevelBadge";
import MapEmbed from "../components/MapEmbed";
import SocialLinks from "../components/SocialLinks";
import {
  getMeetingDetailPath,
  getMeetingIdFromSlug,
  SCHEDULE_PATH,
} from "../utils/contentRoutes";

const RESERVATION_PHONE = "+48666617974";

const normalizeUrl = (raw) => {
  if (!raw) return "";
  let url = raw.replace(/\\/g, "/");
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url.replace(/^\/+/, "")}`;
  }
  return url;
};

const DetailContainer = styled(StyledContainer)`
  max-width: 1100px;
`;

const BackLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  margin-bottom: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const SummaryRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const ActionsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const HeroImage = styled(Image)`
  width: 100%;
  max-height: 520px;
  object-fit: cover;
  object-position: top;
  border-radius: 40px;
  margin-bottom: 2rem;
`;

const InfoList = styled.div`
  display: grid;
  gap: 0.75rem;
  font-size: 1rem;
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  font-size: 1rem;
  line-height: 1.7;
  background-color: ${({ theme }) => theme.colors.cardBackground};
  padding: 2rem;
  border-radius: 40px;
  height: 100%;
`;

const TypeDescriptionContent = ({ typeOfMeetingId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["typeOfMeeting", typeOfMeetingId],
    queryFn: () => fetchTypeOfMeetingById(typeOfMeetingId),
    enabled: Boolean(typeOfMeetingId),
    staleTime: 300000,
  });

  if (isLoading) return <Spinner animation="border" />;
  if (error) {
    return <Alert variant="danger">Nie udało się załadować opisu.</Alert>;
  }

  return (
    <div
      className="wysiwyg-content"
      dangerouslySetInnerHTML={{
        __html: data?.description || "<p>Brak opisu zajęć.</p>",
      }}
    />
  );
};

const InstructorTabContent = ({ instructorId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["instructor", instructorId],
    queryFn: () => fetchInstructorById(instructorId),
    enabled: Boolean(instructorId),
    staleTime: 300000,
  });

  if (isLoading) return <Spinner animation="border" />;
  if (error) {
    return <Alert variant="danger">Nie udało się załadować instruktora.</Alert>;
  }

  if (!data) return <p>Brak danych o instruktorze.</p>;

  const facebookUrl = normalizeUrl(data.facebookLink);
  const instagramUrl = normalizeUrl(data.instagramLink);
  const tiktokUrl = normalizeUrl(data.tikTokLink);

  return (
    <div>
      {data.imageUrl && (
        <div className="text-center mb-4">
          <Image
            src={`${process.env.REACT_APP_API_URL}/${data.imageUrl}`}
            alt={data.name}
            fluid
            style={{
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
      )}

      {data.bio && (
        <div
          className="wysiwyg-content"
          dangerouslySetInnerHTML={{ __html: data.bio }}
        />
      )}

      <div className="mt-4">
        <SocialLinks
          facebookUrl={data.facebookLink ? facebookUrl : undefined}
          instagramUrl={data.instagramLink ? instagramUrl : undefined}
          tiktokUrl={data.tikTokLink ? tiktokUrl : undefined}
        />
      </div>
    </div>
  );
};

const MeetingDetailPage = () => {
  const { slug } = useParams();
  const meetingId = getMeetingIdFromSlug(slug);

  const {
    data: meeting,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["meeting", meetingId],
    queryFn: () => fetchMeetingById(meetingId),
    enabled: Boolean(meetingId),
    staleTime: 300000,
  });

  if (!meetingId) {
    return (
      <DetailContainer>
        <Alert variant="warning" className="text-center">
          Nieprawidłowy adres spotkania.
        </Alert>
      </DetailContainer>
    );
  }

  if (isLoading) {
    return (
      <DetailContainer className="text-center">
        <Spinner animation="border" />
        <p className="mt-3 mb-0">Ładowanie szczegółów spotkania...</p>
      </DetailContainer>
    );
  }

  if (error || !meeting) {
    return (
      <DetailContainer>
        <Alert variant="danger" className="text-center">
          Nie udało się załadować szczegółów spotkania.
        </Alert>
      </DetailContainer>
    );
  }

  const canonicalPath = getMeetingDetailPath({
    id: meeting.id,
    typeOfMeetingName: meeting.typeOfMeetingName,
    name: meeting.name,
    title: meeting.title,
    date: meeting.date,
    start: meeting.start,
  });

  if (slug !== canonicalPath.split("/").pop()) {
    return <Navigate to={canonicalPath} replace />;
  }

  return (
    <DetailContainer>
      <BackLink to={SCHEDULE_PATH}>← Wróć do grafiku</BackLink>

      <StyledTitle>{meeting.typeOfMeetingName || meeting.name}</StyledTitle>

      <SummaryRow>
        {meeting.isEvent && <Tag type="event" />}
        {meeting.isIndividual && <Tag type="individual" />}
        {meeting.isSolo && <Tag type="solo" />}
        {meeting.level !== null && meeting.level !== undefined && (
          <SkillLevelBadge value={meeting.level} />
        )}
      </SummaryRow>

      <ActionsRow>
        <StyledButton as="a" href={`tel:${RESERVATION_PHONE}`}>
          Zadzwoń by zarezerwować
        </StyledButton>
      </ActionsRow>

      {meeting.imageUrl && (
        <HeroImage
          src={`${process.env.REACT_APP_API_URL}/${meeting.imageUrl}`}
          alt={meeting.typeOfMeetingName || meeting.name}
          fluid
        />
      )}

      <StyledTabs defaultActiveKey="info" className="mb-3" variant="pills">
        <Tab eventKey="info" title="Informacje">
          <InfoList>
            <p>
              <strong>Data:</strong> {new Date(meeting.date).toLocaleString()}
            </p>
            <p>
              <strong>Instruktor:</strong> {meeting.instructorName}
            </p>
            <p>
              <strong>Lokalizacja:</strong> {meeting.locationName}
            </p>
            {meeting.locationStreet && (
              <p>
                <strong>Adres:</strong> {meeting.locationStreet}
              </p>
            )}
            {meeting.locationCity && (
              <p>
                <strong>Miejscowość:</strong> {meeting.locationCity}
              </p>
            )}
          </InfoList>
        </Tab>

        <Tab eventKey="description" title="Opis zajęć">
          <TypeDescriptionContent typeOfMeetingId={meeting.typeOfMeetingId} />
        </Tab>

        <Tab eventKey="instructor" title="Instruktor">
          <InstructorTabContent instructorId={meeting.instructorId} />
        </Tab>

        <Tab eventKey="location" title="Dojazd">
          <Row className="g-4">
            <Col md={8}>
              <MapEmbed location={meeting.locationName} />
            </Col>
            <Col md={4}>
              <ContactInfo>
                <b>{meeting.locationName}</b>
                <br />
                {meeting.locationStreet && (
                  <>
                    {meeting.locationStreet}
                    <br />
                  </>
                )}
                {meeting.locationCity && (
                  <>
                    {meeting.locationCity}
                    <br />
                  </>
                )}
                {meeting.locationDescription && (
                  <>
                    <br />
                    {meeting.locationDescription}
                    <br />
                  </>
                )}
                <br />
                <strong>Telefon:</strong>
                <br />
                <a href={`tel:${RESERVATION_PHONE}`}>{RESERVATION_PHONE}</a>
                <br />
                <br />
                <strong>Email:</strong>
                <br />
                <a href="mailto:kontakt@symbiostw.pl">kontakt@symbiostw.pl</a>
                <div className="mt-4">
                  <SocialLinks
                    facebookUrl="https://www.facebook.com/alantanczy"
                    instagramUrl="https://www.instagram.com/symbiostw/"
                    tiktokUrl="https://www.tiktok.com/@symbiostw"
                  />
                </div>
              </ContactInfo>
            </Col>
          </Row>
        </Tab>
      </StyledTabs>
    </DetailContainer>
  );
};

export default MeetingDetailPage;
