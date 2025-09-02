import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "../services/userService";
import { fetchUserMeetings } from "../services/meetingService";
import { fetchUserComments } from "../services/NewsArticleService";
import { Spinner, Alert, Card, Button, Row, Col } from "react-bootstrap";
import {
  StyledCard,
  StyledButton,
  StyledTitle,
  StyledSubTitle,
} from "../components/StyledComponents";
import { useAlert } from "../components/AlertContext";
import MeetingDetailsModal from "../components/MeetingDetailModal";
import EditUserModal from "../components/EditUserModal";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../components/AuthProvider";

const Dashboard = () => {
  const { logout } = useAuth();
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPastMeetings, setShowPastMeetings] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    staleTime: 300000,
  });

  const {
    data: meetings = [],
    isLoading: meetingsLoading,
    isError: meetingsError,
  } = useQuery({
    queryKey: ["userMeetings"],
    queryFn: fetchUserMeetings,
    staleTime: 300000,
  });

  const {
    data: comments = [],
    isLoading: commentsLoading,
    isError: commentsError,
  } = useQuery({
    queryKey: ["userComments"],
    queryFn: fetchUserComments,
    staleTime: 300000,
  });

  const openDetailsModal = (meeting) => setSelectedMeeting(meeting);
  const closeDetailsModal = () => setSelectedMeeting(null);

  if (userLoading || meetingsLoading || commentsLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
        <p>Loading user info, meetings, and comments...</p>
      </div>
    );
  }

  if (userError || meetingsError || commentsError) {
    showAlert("Failed to load data. Please try again.", "danger");
    return (
      <div className="text-center mt-5">
        <Alert variant="danger">
          Failed to load user data, meetings, or comments.
        </Alert>
      </div>
    );
  }

  const sortedMeetings = meetings
    .map((meeting) => ({
      ...meeting,
      title: meeting.name,
      location: meeting.locationName,
      instructor: meeting.instructorName,
      start: new Date(meeting.date),
      end: new Date(
        new Date(meeting.date).getTime() + meeting.duration * 60000
      ),
    }))
    .sort((a, b) => new Date(b.start) - new Date(a.start));

  const now = new Date();
  const upcomingMeetings = sortedMeetings.filter((m) => m.start >= now);
  const pastMeetings = sortedMeetings.filter((m) => m.start < now);

  return (
    <div className="text-center my-5">
      <StyledTitle>Dashboard</StyledTitle>
      {user && (
        <Alert variant="info">
          <p>
            Welcome back,{" "}
            <strong>
              {user.name} {user.surname}
            </strong>
            !
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>City:</strong> {user.city}
          </p>
          <p>
            <strong>Street:</strong> {user.street}
          </p>
          <Button variant="warning" onClick={() => setShowEditModal(true)}>
            Edit Profile
          </Button>{" "}
          <Button variant="warning" onClick={logout}>
            Logout
          </Button>
        </Alert>
      )}

      <StyledSubTitle className="mt-5">Nadchodzące Spotkania</StyledSubTitle>
      {upcomingMeetings.length > 0 ? (
        <div className="mt-3">
          {upcomingMeetings.map((meeting) => (
            <StyledCard key={meeting.id} className={`mb-4 shadow-sm`}>
              {meeting.imageUrl && (
                <StyledCard.Img
                  variant="top"
                  src={`http://localhost:5077/${meeting.imageUrl}`}
                  alt={meeting.title}
                  style={{ height: "100px", objectFit: "cover" }}
                />
              )}
              <StyledCard.Body>
                <Row className="align-items-center">
                  <Col md={4} className="text-center border-end">
                    <h5>{new Date(meeting.start).toLocaleDateString()}</h5>
                    <p>{new Date(meeting.start).toLocaleTimeString()}</p>
                  </Col>
                  <Col md={5} className="text-start">
                    <Card.Title>{meeting.title}</Card.Title>
                    <Card.Text>
                      <strong>Location:</strong> {meeting.location} <br />
                      <strong>Instructor:</strong> {meeting.instructor} <br />
                      {meeting.typeOfMeetingName}
                    </Card.Text>
                  </Col>
                  <Col md={3} className="text-center">
                    <StyledButton
                      variant="primary"
                      size="sm"
                      onClick={() => openDetailsModal(meeting)}
                    >
                      Details
                    </StyledButton>
                  </Col>
                </Row>
              </StyledCard.Body>
            </StyledCard>
          ))}
        </div>
      ) : (
        <p>Obecnie nie jesteś na nic zapisany.</p>
      )}

      <StyledSubTitle className="mt-5">Przeszłe spotkania</StyledSubTitle>
      <Button
        variant="outline-secondary"
        className="mb-3"
        onClick={() => setShowPastMeetings(!showPastMeetings)}
      >
        {showPastMeetings ? "Schowaj" : "Pokaż"} Przeszłe Spotkania
      </Button>
      {showPastMeetings && pastMeetings.length > 0 ? (
        <div className="mt-3">
          {pastMeetings.map((meeting) => (
            <StyledCard key={meeting.id} className={`mb-4 shadow-sm`}>
              {meeting.imageUrl && (
                <StyledCard.Img
                  variant="top"
                  src={`http://localhost:5077/${meeting.imageUrl}`}
                  alt={meeting.title}
                  style={{ height: "100px", objectFit: "cover" }}
                />
              )}
              <StyledCard.Body>
                <Row className="align-items-center">
                  <Col md={4} className="text-center border-end">
                    <h5>{new Date(meeting.start).toLocaleDateString()}</h5>
                    <p>{new Date(meeting.start).toLocaleTimeString()}</p>
                  </Col>
                  <Col md={5} className="text-start">
                    <Card.Title>{meeting.title}</Card.Title>
                    <Card.Text>
                      <strong>Location:</strong> {meeting.location} <br />
                      <strong>Instructor:</strong> {meeting.instructor} <br />
                      {meeting.typeOfMeetingName}
                    </Card.Text>
                  </Col>
                  <Col md={3} className="text-center">
                    <StyledButton
                      variant="primary"
                      size="sm"
                      onClick={() => openDetailsModal(meeting)}
                    >
                      Details
                    </StyledButton>
                  </Col>
                </Row>
              </StyledCard.Body>
            </StyledCard>
          ))}
        </div>
      ) : (
        showPastMeetings && <p>Brak Przeszłych spotkań.</p>
      )}

      <h3 className="mt-5">Your Comments</h3>
      {comments.length > 0 ? (
        <Row className="mt-3">
          {comments.map((comment) => (
            <Col md={4} sm={6} xs={12} key={comment.id} className="mb-3">
              <StyledCard className="h-100">
                <StyledCard.Body className="d-flex flex-column">
                  <Card.Title className="text-truncate">
                    {comment.newsArticleTitle || "Unknown Article"}
                  </Card.Title>
                  <Card.Text className="flex-grow-1 text-truncate">
                    {comment.content}
                  </Card.Text>
                  <small className="text-muted mb-2">
                    {new Date(comment.createdDate).toLocaleString()}
                  </small>
                  <Link to={`/news/${comment.newsArticleId}`}>
                    <StyledButton variant="primary" size="sm">
                      Go to Article
                    </StyledButton>
                  </Link>
                </StyledCard.Body>
              </StyledCard>
            </Col>
          ))}
        </Row>
      ) : (
        <p>You haven't commented on any articles yet.</p>
      )}

      {selectedMeeting && (
        <MeetingDetailsModal
          show={!!selectedMeeting}
          onHide={closeDetailsModal}
          meeting={selectedMeeting}
          isUserParticipant={true}
        />
      )}

      {user && (
        <EditUserModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          user={user}
        />
      )}
    </div>
  );
};

export default Dashboard;
