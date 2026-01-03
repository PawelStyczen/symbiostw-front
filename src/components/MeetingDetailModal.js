import React, { useState } from "react";
import {
  Modal,
  Image,
  Spinner,
  Alert,
  Tabs,
  Tab,
  Row,
  Col,
} from "react-bootstrap";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { StyledModal, StyledButton, StyledTabs } from "./StyledComponents";
import { useQuery } from "@tanstack/react-query";
import { fetchTypeOfMeetingById } from "../services/typeOfMeetingService";
import { fetchInstructorById } from "../services/instructorService";
import Tag from "./Tag";
import ContactSection from "./ContactSection";

import SocialLinks from "./SocialLinks";
import SkillLevelBadge from "./SkillLevelBadge";
import MapEmbed from "./MapEmbed";

// helper to normalize links
const normalizeUrl = (raw) => {
  if (!raw) return "";
  let u = raw.replace(/\\/g, "/");
  if (!/^https?:\/\//i.test(u)) u = "https://" + u.replace(/^\/+/, "");
  return u;
};

const MeetingDetailsModal = ({ show, onHide, meeting, isUserParticipant }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  const isMeetingPast = new Date(meeting.start) < new Date();

  const ContactInfo = styled.div`
    font-size: 1rem;
    line-height: 1.6;
    background-color: ${({ theme }) => theme.colors.cardBackground};
    padding: 30px;
    border-radius: 50px;
  `;
  return (
    <StyledModal show={show} onHide={onHide} centered size="xl" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          {meeting.title} {meeting.isEvent && <Tag type="event" />}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StyledTabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
          variant="pills"
        >
          {/* --- Info Tab --- */}
          <Tab eventKey="info" title="Informacje">
            {meeting.imageUrl && (
              <div className="text-center mb-3">
                <Image
                  src={`${process.env.REACT_APP_API_URL}/${meeting.imageUrl}`}
                  alt={meeting.title}
                  fluid
                  style={{
                    maxHeight: "450px",
                    objectFit: "cover",
                    width: "100%",
                    objectPosition: "top",
                  }}
                />
              </div>
            )}
            <p>
              {meeting.isIndividual && <Tag type="individual" />}
              {meeting.isSolo && <Tag type="solo" />}
            </p>
            {meeting.level !== null && meeting.level !== undefined && (
              <p style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <strong>Poziom:</strong>
                <SkillLevelBadge value={meeting.level} />
              </p>
            )}

            <p>
              <strong>Data:</strong> {new Date(meeting.start).toLocaleString()}
            </p>
            <p>
              <strong>Lokalizacja:</strong> {meeting.location}
              <p>Miejscowość: {meeting.locationCity}</p>
            </p>
          </Tab>

          {/* --- Class Description Tab --- */}
          <Tab eventKey="description" title="Opis zajęć">
            <TypeDescriptionContent typeOfMeetingId={meeting.typeOfMeetingId} />
          </Tab>

          {/* --- Instructor Tab --- */}
          <Tab eventKey="instructor" title="Instruktor">
            <InstructorTabContent instructorId={meeting.instructorId} />
          </Tab>

          {/* --- Contact/Map Tab --- */}
          <Tab eventKey="dojazd" title="Dojazd">
            <Row>
              <Col md={9}>
                <MapEmbed location={meeting.location} />
              </Col>

              <Col md={3} className="d-flex flex-column justify-content-center">
                <ContactInfo>
                  <br />
                  <b>{meeting.location}</b>
                  <br />
                  {meeting.locationStreet}
                  <br />
                  {meeting.locationCity}
                  <br />
                  <br />
                  {meeting.locationDescription}
                  <br />
                  <br />
                  <strong>Telefon:</strong>
                  <br />
                  666 617 974
                  <br />
                  <br />
                  <strong>Email:</strong>
                  <br />
                  kontakt@symbiostw.pl
                  <SocialLinks
                    facebookUrl="https://www.facebook.com/alantanczy"
                    instagramUrl="https://www.instagram.com/symbiostw/"
                    tiktokUrl={"https://www.tiktok.com/@symbiostw"}
                  />
                </ContactInfo>
              </Col>
            </Row>
          </Tab>
        </StyledTabs>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <p>
          <b>zadzwoń i umów się na zajęcia</b>
        </p>
        <StyledButton variant="secondary" onClick={onHide}>
          zamknij
        </StyledButton>
      </Modal.Footer>
    </StyledModal>
  );
};

const TypeDescriptionContent = ({ typeOfMeetingId }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["typeOfMeeting", typeOfMeetingId],
    queryFn: () => fetchTypeOfMeetingById(typeOfMeetingId),
    enabled: !!typeOfMeetingId,
    staleTime: 300000,
  });

  if (isLoading) return <Spinner animation="border" />;
  if (error)
    return <Alert variant="danger">Nie udało się załadować opisu.</Alert>;

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
    enabled: !!instructorId,
    staleTime: 300000,
  });

  if (isLoading) return <Spinner animation="border" />;
  if (error)
    return <Alert variant="danger">Nie udało się załadować instruktora.</Alert>;

  if (!data) return <p>Brak danych o instruktorze.</p>;

  const facebookUrl = normalizeUrl(data.facebookLink);
  const instagramUrl = normalizeUrl(data.instagramLink);
  const tiktokUrl = normalizeUrl(data.tikTokLink);

  return (
    <div>
      {data.imageUrl && (
        <div className="text-center mb-3">
          <Image
            src={`${process.env.REACT_APP_API_URL}/${data.imageUrl}`}
            alt={data.name}
            fluid
            style={{
              width: "400px",
              height: "400px",
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

      <div className="mt-3">
        <SocialLinks
          facebookUrl={data.facebookLink ? facebookUrl : undefined}
          instagramUrl={data.instagramLink ? instagramUrl : undefined}
          tiktokUrl={data.tikTokLink ? tiktokUrl : undefined}
        />
      </div>
    </div>
  );
};

export default MeetingDetailsModal;
