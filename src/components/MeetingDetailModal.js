import React from "react";
import { Modal, Image } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { StyledModal, StyledButton } from "./StyledComponents";
import Tag from "./Tag";
import SkillLevelBadge from "./SkillLevelBadge";
import { getMeetingDetailPath } from "../utils/contentRoutes";

const RESERVATION_PHONE = "+48666617974";

const SummaryList = styled.div`
  display: grid;
  gap: 0.75rem;
  font-size: 1rem;
  line-height: 1.6;
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const MeetingDetailsModal = ({ show, onHide, meeting, isUserParticipant }) => {
  return (
    <StyledModal show={show} onHide={onHide} centered size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>
          {meeting.title} {meeting.isEvent && <Tag type="event" />}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        <TagsRow>
          {meeting.isIndividual && <Tag type="individual" />}
          {meeting.isSolo && <Tag type="solo" />}
          {meeting.level !== null && meeting.level !== undefined && (
            <SkillLevelBadge value={meeting.level} />
          )}
        </TagsRow>

        <SummaryList>
          <p>
            <strong>Data:</strong> {new Date(meeting.start).toLocaleString()}
          </p>
          {meeting.instructor && (
            <p>
              <strong>Instruktor:</strong> {meeting.instructor}
            </p>
          )}
          <p>
            <strong>Lokalizacja:</strong> {meeting.location}
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
          {meeting.locationDescription && <p>{meeting.locationDescription}</p>}
        </SummaryList>
      </Modal.Body>
      <Modal.Footer className="d-flex gap-2 justify-content-end">
        <StyledButton as="a" href={`tel:${RESERVATION_PHONE}`}>
          Zadzwoń by zarezerwować
        </StyledButton>
        <StyledButton
          as={Link}
          to={getMeetingDetailPath(meeting)}
          variant="secondary"
        >
          Szczegóły
        </StyledButton>
      </Modal.Footer>
    </StyledModal>
  );
};

export default MeetingDetailsModal;
