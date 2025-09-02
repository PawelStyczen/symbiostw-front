import React, { useEffect, useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import { fetchHighlightedMeetings } from "../services/meetingService";
import {
  StyledCard,
  StyledButton,
  StyledTitle,
  StyledLink,
} from "../components/StyledComponents";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import MeetingDetailModal from "./MeetingDetailModal"; // Import the modal

import Tag from "./Tag";

import SkillLevelBadge from "./SkillLevelBadge";

const MeetingImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;

const ListWrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MeetingThumb = styled.img`
  width: 30%;
  height: 60px;
  object-fit: cover;
  object-position: center;
  opacity: 0.6;
  transition: all 0.15s;
`;
const MeetingInfo = styled.div`
  flex: 1;
  min-width: 0;
  transition: all 0.15s;
`;
const MeetingItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0rem 0rem;
  overflow: hidden;
  margin-bottom: 0.5rem;
  border-radius: 50px;
  border-bottom: 1px solid #eee;
  background-color: ${({ theme }) => theme.colors.cardBackground};

  cursor: pointer;
  transition: all 0.15s;
  &:hover {
    background: darken(${({ theme }) => theme.colors.cardBackground}, 25%);
    ${MeetingThumb} {
      width: 45%; /* expand the thumbnail */
      opacity: 1; /* make it fully visible */
    }
      ${MeetingInfo} {
      color: ${({ theme }) => theme.colors.primary};
      font-size: 1.5em;
  }
`;

const MeetingDate = styled.span`
  color: #888;
  font-size: 0.9em;
  margin-right: 0.5em;
`;

const HighlightedMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadMeetings = async () => {
      try {
        const data = await fetchHighlightedMeetings();
        setMeetings(data);
      } catch (err) {
        setError("Failed to load highlighted meetings.");
      } finally {
        setLoading(false);
      }
    };
    loadMeetings();
  }, []);

  const handleCardClick = (meeting) => {
    setSelectedMeeting({
      ...meeting,
      title: meeting.name,
      start: meeting.date,
      instructor: meeting.instructorName,
      price: meeting.price,
      imageUrl: meeting.imageUrl,
      typeOfMeetingId: meeting.typeOfMeetingId,
      isIndividual: meeting.isIndividual,
      isSolo: meeting.isSolo,
      level: meeting.level,
    });
    setModalShow(true);
  };

  if (loading)
    return <Spinner animation="border" className="d-block mx-auto my-5" />;
  if (error)
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );

  return (
    <div className="container mt-5">
      <StyledTitle className="text-center mb-4">
        Nadchodzące Zajęcia
      </StyledTitle>

      {meetings.length === 0 ? (
        <Alert variant="warning" className="text-center">
          Brak nadchodzących spotkań.
        </Alert>
      ) : (
        <ListWrapper>
          {meetings.map((meeting) => (
            <MeetingItem
              key={meeting.id}
              onClick={() => handleCardClick(meeting)}
            >
              {meeting.imageUrl && (
                <MeetingThumb
                  src={`http://localhost:5077/${meeting.imageUrl}`}
                  alt={meeting.name}
                />
              )}
              <MeetingInfo>
                <MeetingDate>
                  {new Date(meeting.date).toLocaleDateString()}
                </MeetingDate>
                <strong>{meeting.typeOfMeetingName}</strong>
              </MeetingInfo>
            </MeetingItem>
          ))}
        </ListWrapper>
      )}

      <StyledLink to="/schedule" align="right">
        Zobacz cały Grafik
      </StyledLink>

      {selectedMeeting && (
        <MeetingDetailModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          meeting={selectedMeeting}
          isUserParticipant={false}
        />
      )}
    </div>
  );
};

export default HighlightedMeetings;
